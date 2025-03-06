import connectToDB from '@/Lib/db';
import Product from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req:NextRequest, { params }: { params: Promise<{ id: string }>}){
  try {
    console.log('GET route hit')
    await connectToDB();
    const {id} =  await params;
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return  NextResponse.json(product, { status: 200 });
  } catch (err) {
    return  NextResponse.json({ err,error: 'Failed to fetch product' }, { status: 500 });
  }
}
