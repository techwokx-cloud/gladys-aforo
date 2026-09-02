import { Pool } from "pg";

// Reuse a single pool across hot reloads in dev and across serverless
// invocations where the module stays warm.
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var _pgSchemaReady: Promise<void> | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add your Postgres connection string as the DATABASE_URL environment variable."
    );
  }
  return new Pool({
    connectionString,
    ssl: process.env.DATABASE_SSL === "false" ? undefined : { rejectUnauthorized: false },
    connectionTimeoutMillis: 8000,
    idleTimeoutMillis: 30000,
    statement_timeout: 10000,
    max: 5,
  });
}

export function getPool(): Pool {
  if (!global._pgPool) global._pgPool = createPool();
  return global._pgPool;
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS donations (
  id TEXT PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  amount NUMERIC,
  currency TEXT,
  interval TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS support_requests (
  id TEXT PRIMARY KEY,
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
  attachment_names JSONB DEFAULT '[]',
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS social_posts (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT,
  platform TEXT,
  category TEXT DEFAULT 'general',
  status TEXT,
  scheduled_for TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  photo TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id TEXT PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS memorial_photos (
  id TEXT PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
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
  facebook_provider TEXT DEFAULT 'none',
  instagram_provider TEXT DEFAULT 'none'
);
`;

export function ensureSchema(): Promise<void> {
  if (!global._pgSchemaReady) {
    global._pgSchemaReady = getPool().query(SCHEMA_SQL).then(() => undefined);
  }
  return global._pgSchemaReady;
}
