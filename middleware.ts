import { NextRequest, NextResponse } from "next/server";

async function apiAccess(req: NextRequest, res: NextResponse) {
  const allowedOrigins =
    "http://localhost:3000" ||
    "https://test-next-auth-psi.vercel.app" ||
    "https://dashboard.stripe.com/v1/webhook_endpoints";
  if (
    req.nextUrl.pathname.startsWith("/api") &&
    req.nextUrl.origin !== allowedOrigins
  ) {
    return NextResponse.json("Origin Unauthorized");
  }
  return NextResponse.next();
}

export default apiAccess;
