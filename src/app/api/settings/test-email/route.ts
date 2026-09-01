import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { sendMail, isMailerConfigured } from "@/lib/mailer";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!(await isMailerConfigured())) {
    return NextResponse.json({ error: "SMTP is not configured yet." }, { status: 400 });
  }

  try {
    const result = await sendMail({
      subject: "Test Email — Gladys Aforo Foundation Dashboard",
      html: "<p>This is a test email confirming your SMTP settings are working correctly.</p>",
    });
    if (!result.sent) {
      return NextResponse.json({ error: result.reason ?? "Failed to send." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send test email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
