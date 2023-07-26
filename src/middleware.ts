import { NextResponse, type NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath =
    path === "/signin" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/verify-email"

  const token = request.cookies.get("token")?.value

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl))
  }
}

export const config = {
  matcher: [
    "/profile",
    "/signin",
    "/signup",
    "/verifyemail",
    "/forgot-password",
  ],
}
