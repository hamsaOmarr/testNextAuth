import { NextRequest, NextResponse } from "next/server";

async function apiAccess(req: NextRequest, res: NextResponse) {
  if (
    req.nextUrl.pathname.startsWith("/api") &&
    req.nextUrl.origin !== "http://localhost:3000"
  ) {
    return NextResponse.json("Origin Unauthorized");
  }
  return NextResponse.next();
}

export default apiAccess;
