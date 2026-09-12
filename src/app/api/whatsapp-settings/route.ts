import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { getWhatsAppSettings, saveWhatsAppSettings } from "@/lib/store";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const settings = await getWhatsAppSettings();
  return NextResponse.json({
    settings: { ...settings, accessToken: settings.accessToken ? "••••••••" : "" },
  });
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const current = await getWhatsAppSettings();

  const settings = {
    phoneNumberId: body.phoneNumberId ?? current.phoneNumberId,
    accessToken:
      body.accessToken && body.accessToken !== "••••••••" ? body.accessToken : current.accessToken,
    templateName: body.templateName || current.templateName,
    recipient1: body.recipient1 ?? current.recipient1,
    recipient2: body.recipient2 ?? current.recipient2,
    recipient3: body.recipient3 ?? current.recipient3,
    recipient4: body.recipient4 ?? current.recipient4,
    recipient5: body.recipient5 ?? current.recipient5,
  };

  await saveWhatsAppSettings(settings);
  return NextResponse.json({ ok: true });
}
