import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/Lib/db";
import Product from "@/models/Product"; // Ensure this is your Mongoose model

export async function GET(req:NextRequest) {
  try {
    await connectDB();
    
    // Extract search query from request URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    let searchCondition;

    const mfiMatch = query.match(/mfi\s+(\S+)/i); // Extracts value after "mfi"

    if (mfiMatch) {
      const mfiValue = mfiMatch[1]; // Get the number/term after "mfi"
      searchCondition = { MFI: new RegExp(`^${mfiValue}$`, "i") }; // Exact match for MFI field
    } else {
      // General search across multiple fields
      const searchRegex = new RegExp(query, "i");
      searchCondition = {
        $or: [
          { POLYMER: searchRegex },
          { BRAND: searchRegex },
          { GRADE: searchRegex },
          { CATEGORY: searchRegex },
          { APPLICATION: searchRegex },
        ],
      };
    }
    // Construct a case-insensitive search across multiple fields
    // const searchCondition = query
    //   ? {
    //       $or: [
    //         { POLYMER: { $regex: query, $options: "i" } },
    //         { CATEGORY: { $regex: query, $options: "i" } },
    //         { BRAND: { $regex: query, $options: "i" } },
    //         { GRADE: { $regex: query, $options: "i" } },
    //         { MFI: { $regex: query, $options: "i" } },
    //         { APPLICATION: { $regex: query, $options: "i" } },
    //       ],
    //     }
    //   : {};

    // Fetch matching products
    const products = await Product.find(searchCondition).limit(20); // Limit results for performance

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
