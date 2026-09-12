import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { getWhatsAppSettings } from "@/lib/store";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getWhatsAppSettings();
  if (!settings.phoneNumberId || !settings.accessToken) {
    return NextResponse.json({ error: "WhatsApp isn't configured yet — add a Phone Number ID and Access Token first." }, { status: 400 });
  }

  const results = await sendWhatsAppNotification(settings, ["This is a test notification from the dashboard."]);
  return NextResponse.json({ ok: true, results });
}
