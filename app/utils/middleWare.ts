<<<<<<< HEAD
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("CLIENT_JLOOMS_TOKEN")?.value;
=======
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("JLOOMS_TOKEN")?.value;
>>>>>>> 081db88 (update the project files and create a mock data and create business pages.)

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  } else if (token && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
