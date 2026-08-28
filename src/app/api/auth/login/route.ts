import { NextRequest, NextResponse } from "next/server";
import { signSession, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "gladys2026";

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await signSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
