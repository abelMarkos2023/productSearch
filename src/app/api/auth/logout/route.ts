import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

  const cookieRes = await cookies()

  cookieRes.delete("token")
  const response = NextResponse.json({ message: "Logged out" });

  // Set the token cookie to an empty value with an expired date
  // response.headers.set(
  //   "Set-Cookie",
  //   "token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  // );

  return response;
}
