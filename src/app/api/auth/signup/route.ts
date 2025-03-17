import { NextResponse } from "next/server";
import User from "@/models/User"; 
import dbConnect from "@/Lib/db"; // Ensure database connection

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Create new user
    const newUser = new User({ email, password });
    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
