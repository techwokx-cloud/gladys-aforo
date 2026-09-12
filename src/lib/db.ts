import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
  // eslint-disable-next-line no-var
  var _mysqlSchemaReady: Promise<void> | undefined;
}

/**
 * Thin compatibility layer so the rest of the app can keep calling
 * `pool.query(sql, params)` and destructuring `{ rows }`, matching the
 * shape the codebase was originally written against (pg). This:
 *  - converts Postgres-style "$1, $2" placeholders to mysql2's "?"
 *  - returns { rows } instead of mysql2's [rows, fields] tuple
 */
export type QueryResult = { rows: any[] };

export interface CompatPool {
  query(sql: string, params?: any[]): Promise<QueryResult>;
}

/**
 * Converts Postgres-style "$1, $2, ..." placeholders (which reference params
 * by number, and can appear in any order in the SQL text) to mysql2's "?"
 * placeholders (which bind strictly in text order) — reordering the params
 * array to match, since e.g. "SET x=$2 WHERE id=$1" has $1 appearing after
 * $2 in the text despite being params[0].
 */
function toMysqlQuery(sql: string, params: any[]): { sql: string; params: any[] } {
  const reordered: any[] = [];
  const converted = sql.replace(/\$(\d+)/g, (_match, num) => {
    reordered.push(params[Number(num) - 1]);
    return "?";
  });
  return { sql: converted, params: reordered };
}

function wrapPool(pool: mysql.Pool): CompatPool {
  return {
    async query(sql: string, params: any[] = []): Promise<QueryResult> {
      const { sql: convertedSql, params: convertedParams } = toMysqlQuery(sql, params);
      const [rows] = await pool.query(convertedSql, convertedParams);
      return { rows: rows as any[] };
    },
  };
}

function createPool(): mysql.Pool {
  const connectionString = process.env.DATABASE_URL;
  const socketPath = process.env.DATABASE_SOCKET_PATH;

  if (socketPath) {
    // For hosts (like cPanel/CloudLinux MySQL) where only the local Unix
    // socket is reliably reachable rather than TCP host/port.
    const user = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    const database = process.env.DATABASE_NAME;
    if (!user || !password || !database) {
      throw new Error(
        "DATABASE_SOCKET_PATH is set, so DATABASE_USER, DATABASE_PASSWORD, and DATABASE_NAME are also required."
      );
    }
    return mysql.createPool({
      socketPath,
      user,
      password,
      database,
      connectionLimit: 5,
      connectTimeout: 8000,
    });
  }

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add your MySQL connection string (mysql://user:pass@host:port/db), or set DATABASE_SOCKET_PATH + DATABASE_USER/DATABASE_PASSWORD/DATABASE_NAME to connect via a local Unix socket."
    );
  }

  return mysql.createPool({
    uri: connectionString,
    connectionLimit: 5,
    connectTimeout: 8000,
  });
}

export function getPool(): CompatPool {
  if (!global._mysqlPool) global._mysqlPool = createPool();
  return wrapPool(global._mysqlPool);
}

// MySQL/MariaDB schema. Notes vs. the original Postgres version:
//  - id columns are VARCHAR(36) (UUIDs), since TEXT can't be a PRIMARY KEY
//    in MySQL without an explicit key-length prefix.
//  - TIMESTAMPTZ -> DATETIME DEFAULT CURRENT_TIMESTAMP (no timezone type).
//  - JSONB -> TEXT; the app JSON.stringify/parses this column itself.
//  - "ON CONFLICT ... DO UPDATE" -> "ON DUPLICATE KEY UPDATE" (see store.ts).
const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS donations (
  id VARCHAR(36) PRIMARY KEY,
  reference VARCHAR(64) UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  amount DECIMAL(12,2),
  currency VARCHAR(8),
  interval_type VARCHAR(20),
  status VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(36) PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS support_requests (
  id VARCHAR(36) PRIMARY KEY,
  full_name TEXT,
  role TEXT,
  phone TEXT,
  email TEXT,
  facility TEXT,
  district TEXT,
  family_head_name TEXT,
  dependents TEXT,
  situation TEXT,
  support_type TEXT,
  estimated_amount TEXT,
  urgency TEXT,
  additional_info TEXT,
  attachment_names TEXT,
  status VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS social_posts (
  id VARCHAR(36) PRIMARY KEY,
  title TEXT,
  content TEXT,
  platform VARCHAR(20),
  category VARCHAR(20) DEFAULT 'general',
  status VARCHAR(20),
  scheduled_for TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(36) PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  photo TEXT,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id VARCHAR(36) PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS memorial_photos (
  id VARCHAR(36) PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT,
  sort_order INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS smtp_settings (
  id INT PRIMARY KEY DEFAULT 1,
  host TEXT,
  port INT,
  secure BOOLEAN,
  smtp_user TEXT,
  smtp_pass TEXT,
  to_email TEXT
);

CREATE TABLE IF NOT EXISTS publishing_settings (
  id INT PRIMARY KEY DEFAULT 1,
  buffer_api_key TEXT,
  buffer_facebook_channel_id TEXT,
  buffer_instagram_channel_id TEXT,
  postiz_base_url TEXT,
  postiz_api_key TEXT,
  postiz_facebook_integration_id TEXT,
  postiz_instagram_integration_id TEXT,
  facebook_provider VARCHAR(20) DEFAULT 'none',
  instagram_provider VARCHAR(20) DEFAULT 'none'
);

CREATE TABLE IF NOT EXISTS chat_conversations (
  id VARCHAR(36) PRIMARY KEY,
  visitor_name TEXT,
  visitor_contact TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id VARCHAR(36) PRIMARY KEY,
  conversation_id VARCHAR(36) NOT NULL,
  role VARCHAR(10) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whatsapp_settings (
  id INT PRIMARY KEY DEFAULT 1,
  phone_number_id TEXT,
  access_token TEXT,
  template_name TEXT DEFAULT 'website_chat_notification',
  recipient_1 TEXT,
  recipient_2 TEXT,
  recipient_3 TEXT,
  recipient_4 TEXT,
  recipient_5 TEXT
);
`;

export function ensureSchema(): Promise<void> {
  if (!global._mysqlSchemaReady) {
    global._mysqlSchemaReady = (async () => {
      const pool = getPool();
      // MySQL doesn't support multiple statements in one query() call by
      // default, so run each CREATE TABLE separately.
      const statements = SCHEMA_SQL.split(";").map((s) => s.trim()).filter(Boolean);
      for (const statement of statements) {
        await pool.query(statement);
      }
    })();
  }
  return global._mysqlSchemaReady;
}
