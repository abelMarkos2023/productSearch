import { NextRequest, NextResponse } from 'next/server';
import * as xlsx from 'xlsx';
import { writeFile } from 'fs/promises';
import path from 'path';
import connectDB from '@/Lib/db';
import DataModel from '@/models/Product';
import os from 'os';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 });
    }
    
    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

// Change this line
console.log('getting file bath')

// To this:
const filePath = path.join(os.tmpdir(), file.name);
    await writeFile(filePath, buffer);
    
    // Parse Excel file
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = 'Data';
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    
    // Connect to MongoDB
    await connectDB();
    
    // Insert data into MongoDB
    await DataModel.insertMany(jsonData);
    
    return NextResponse.json({ message: 'Data inserted successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ message: 'Error processing file' }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    await connectDB();

    // Extract query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    // Fetch paginated data from MongoDB
    const data = await DataModel.find().skip(skip).limit(limit);
    const totalCount = await DataModel.countDocuments();

    return NextResponse.json({
      data,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching paginated data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

