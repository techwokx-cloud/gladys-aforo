import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySession(token).then((valid) => {
    if (!valid) {
      const loginUrl = new URL("/dashboard/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
