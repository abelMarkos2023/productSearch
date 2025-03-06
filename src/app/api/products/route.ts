import  connectDB  from "@/Lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q"); // Get user input from query string

  if (!query) {
    return NextResponse.json({ message: "No search term provided" }, { status: 400 });
  }

  try {
    const searchQuery = {
      $or: [
        { polymer: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { grade: { $regex: query, $options: "i" } },
        { mfi: { $regex: query, $options: "i" } },
        { application: { $regex: query, $options: "i" } }
      ],
    };

    const products = await Product.find(searchQuery);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
