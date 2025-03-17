import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/Lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await dbConnect();

  const cookie = await cookies()
  try {
    const { email, password } = await req.json();
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign({ userId: user._id,name:user.name,email:user.email }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Store JWT in HttpOnly Cookie
    cookie.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 604800 });

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
