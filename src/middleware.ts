import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // 🔒 Protect /upload - Only allow logged-in users
  if (!token && pathname === "/upload") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // 🚫 Prevent logged-in users from accessing /signin and /signup
  if (token && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to home or dashboard
  }

  return NextResponse.next();
}

// Apply middleware to signin, signup, and upload pages
export const config = {
  matcher: ["/signin", "/signup", "/upload"],
};
