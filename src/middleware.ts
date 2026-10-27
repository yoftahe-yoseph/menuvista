import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/qr", "/settings"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!isProtected) return NextResponse.next();

  const session = req.cookies.get("mv_session")?.value;
  if (session === "authenticated") return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/qr/:path*", "/settings/:path*"],
};