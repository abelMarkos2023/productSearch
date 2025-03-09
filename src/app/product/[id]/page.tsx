"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import GoogleSandbox from '@/components/GoogleSandbox';

type GoogleSearchResult = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  snippet?: string;
  htmlSnippet?: string;
  mime?: string;
  fileFormat?: string;
  pagemap?: {
    cse_thumbnail?: {
      src: string;
      width: string;
      height: string;
    }[];
    cse_image?: {
      src: string;
    }[];
    metatags?: {
      moddate?: string;
      creator?: string;
      creationdate?: string;
      producer?: string;
      author?: string;
      title?: string;
      snippet?: string;
    }[];
  };
};

export type TProduct = {
  _id: string,
  BRAND: string;
  GRADE: string;
  CATEGORY: string;
  POLYMER: string;
  PRICE: number;
  IMAGE_URL: string;
  APPLICATION: string;
  MFI: string;
}

export default function ProductDetail({ params }:{
  params: Promise<{ id: string }>
}) {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [googleProducts, setGoogleProducts] = useState<GoogleSearchResult[]>([]);
 // const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const { id } = await params;
      const res = await fetch(`/api/product/${id}`);
      const data = await res.json();
      setProduct(data);
      //AND application : ${data.APPLICATION}
      const query = `${data?.POLYMER} `;

      console.log(query)
      const response = await fetch(`/api/google-search?query=${query}`);
      const result = await response.json();
      // const serpData = await fetch(`/api/serpAPI?name=${data.POLYMER}&grade=${data.GRADE}`);
      // console.log('google data',result)
      // const serpDataJson = await serpData.json();
      // console.log("SerpData ", serpDataJson);
      console.log('results',result)
     setGoogleProducts([...result?.items]);
    };
    fetchProduct();
  }, [params]);

  useEffect(() => {

    const CX2 = process.env.NEXT_PUBLIC_CX2

    console.log('CX2',CX2)
    const script = document.createElement('script');
    script.src = `https://cse.google.com/cse.js?cx=${CX2}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);


  

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        {/* Spinner */}
        <div className="w-24 h-24 border-12 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  
        {/* Loading Text */}
        <p className="mt-4 text-gray-700 text-2xl font-medium">Fetching product details...</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div 
        className="h-[50vh] flex flex-col items-center justify-center bg-cover bg-center  text-white text-center"
        style={{ backgroundImage: "url('/bg3.webp')" }}
      >
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">{product?.BRAND} - {product?.GRADE}</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4 drop-shadow-md">{product?.CATEGORY}</p>
      </div>

      {/* Content Layout */}
      <div className="w-full bg-grad-5 h-screen">
      <div className="max-w-[90vw] mx-auto py-4 grid lg:grid-cols-2 gap-8">
        {/* Product Details (Sticky) */}
        <div className="bg-[#1E293B] text-white p-8 rounded-lg shadow-lg h-fit sticky top-20">
          <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
          <p><strong>Polymer:</strong> {product.POLYMER}</p>
          <p><strong>Category:</strong> {product.CATEGORY}</p>
          <p><strong>Brand:</strong> {product.BRAND}</p>
          <p><strong>Grade:</strong> {product.GRADE}</p>
          <p><strong>MFI:</strong> {product.MFI}</p>
          <p><strong>Application:</strong> {product.APPLICATION}</p>
        </div>

        {/* Google Search Results (Scrollable) */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Google Search Results</h2>
          <GoogleSandbox />
          {googleProducts?.length > 0 ? (
            googleProducts.map((product, index) => (
              <div key={index} className="mb-6 p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.snippet}</p>
                {product.pagemap?.cse_image?.[0]?.src ? (
                  <Image 
                    width={300} 
                    height={200} 
                    src={
                      product.pagemap?.cse_image?.[0]?.src?.startsWith("http")
                        ? product.pagemap.cse_image[0].src
                        : "/no-image.webp" // Use a local placeholder image
                    }
                    alt={product.title}
                    className="rounded-lg shadow-md"
                  />
                ) : (
                  <p className="text-gray-500">No image available</p>
                )}
              </div>
            ))
          ) : (
            <h3 className="text-center text-gray-600">No Matching Products</h3>
          )}
        </div>
      </div>
      </div>
    </>
  );
}





  
