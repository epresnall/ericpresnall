// Next.js 16 "proxy" (formerly middleware). Gates the cockpit + its API behind a
// password cookie. The public marketing site is untouched.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, isAuthed } from "@/lib/cockpit/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and login API through unauthenticated.
  if (pathname === "/cockpit/login" || pathname === "/api/cockpit/login") {
    return NextResponse.next();
  }

  const authed = await isAuthed(request.cookies.get(COOKIE_NAME)?.value);
  if (authed) return NextResponse.next();

  // API calls get a 401; page navigations get redirected to the login screen.
  if (pathname.startsWith("/api/cockpit")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const loginUrl = new URL("/cockpit/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cockpit/:path*", "/api/cockpit/:path*"],
};
