import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveMessage } from "@/lib/store";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const saved = saveMessage({
    id: randomUUID(),
    name,
    email,
    subject,
    message,
    createdAt: new Date().toISOString(),
  });

  try {
    await sendMail({
      subject: `New contact message: ${subject || "Website inquiry"}`,
      replyTo: email,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send contact email", err);
  }

  return NextResponse.json({ ok: true, message: saved });
}
