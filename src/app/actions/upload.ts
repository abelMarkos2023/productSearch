"use server";

import { promises as fs } from "fs";
import path from "path";
import XLSX from "xlsx";
import  connectDB  from "@/Lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function uploadExcelFile(formData: FormData) {
  const file = formData.get("file");

  console.log('server action hit')

  if (!file || typeof file === "string") {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const filePath = path.join("/tmp", file.name);
  const fileBuffer = await file.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(fileBuffer));

  try {
    await connectDB();
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    await Product.insertMany(data);

    return NextResponse.json({ message: "Data inserted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
