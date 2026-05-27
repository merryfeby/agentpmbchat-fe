import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const userToken = req.cookies.get("user_token")?.value

  const isLoginPage = path === "/login"
  const isRegisterPage = path === "/register"


  if ((isLoginPage || isRegisterPage) && userToken) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  const response = NextResponse.next()

  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  response.headers.delete("x-powered-by")
  
  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
}