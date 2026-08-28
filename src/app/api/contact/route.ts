import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { saveMessage } from "@/lib/store";

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

  return NextResponse.json({ ok: true, message: saved });
}
