// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // التحقق من المسارات المحمية
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // استثناء صفحة تسجيل الدخول
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // التحقق من وجود توكن المصادقة
    const token = request.cookies.get("auth-token");
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*", // حماية جميع مسارات الأدمن
  ],
};
