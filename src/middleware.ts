import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PUBLIC = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !ADMIN_PUBLIC.some((p) => pathname === p)) {
    const token = request.cookies.get("oncampus_admin")?.value;
    if (!token?.includes(".")) {
      const login = new URL("/admin/login", request.url);
      login.searchParams.set("next", pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
