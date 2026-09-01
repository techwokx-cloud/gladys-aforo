import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { getSmtpSettings, saveSmtpSettings } from "@/lib/store";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await getSmtpSettings();
  return NextResponse.json({
    settings: { ...settings, pass: settings.pass ? "••••••••" : "" },
    configured: Boolean(settings.user && settings.pass),
  });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const current = await getSmtpSettings();

  const settings = {
    host: body.host || current.host,
    port: Number(body.port) || current.port,
    secure: Boolean(body.secure),
    user: body.user ?? current.user,
    // Keep the existing password if the masked placeholder came back unchanged.
    pass: body.pass && body.pass !== "••••••••" ? body.pass : current.pass,
    to: body.to ?? current.to,
  };

  await saveSmtpSettings(settings);
  return NextResponse.json({ ok: true });
}
