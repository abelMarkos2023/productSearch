import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/Lib/db";
import User from "@/models/User";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // Use environment variable

export async function GET(req: NextRequest) {
  try {
    
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, SECRET_KEY) as {userId:string, name: string; email: string };
    connectDB()
    console.log(decoded)

    const user = await User.findById(decoded.userId).select("-password")
    return NextResponse.json(user);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
