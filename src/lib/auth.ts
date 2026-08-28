const SECRET = process.env.ADMIN_SESSION_SECRET ?? "gaf-dashboard-dev-secret-change-me";
export const SESSION_COOKIE = "gaf_session";

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const bin = String.fromCharCode(...arr);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toBase64Url(sig);
}

export async function signSession(): Promise<string> {
  const payload = `admin:${Date.now()}`;
  const sig = await hmac(payload);
  return toBase64Url(new TextEncoder().encode(`${payload}.${sig}`));
}

export async function verifySession(token?: string | null): Promise<boolean> {
  if (!token) return false;
  try {
    const decoded = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    const lastDot = decoded.lastIndexOf(".");
    if (lastDot === -1) return false;
    const payload = decoded.slice(0, lastDot);
    const sig = decoded.slice(lastDot + 1);
    const expected = await hmac(payload);
    if (sig.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
    return diff === 0;
  } catch {
    return false;
  }
}
