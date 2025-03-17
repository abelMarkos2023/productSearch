"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import GoogleSandbox from '@/components/GoogleSandbox';
import type { TDataSheetResult, TSimilarProduct } from '@/app/types';
import SimilarProductsSlider from '@/components/SimilarProductsSlider';
// import PdfReader from '@/components/PdfReader';
// import ReadPdf from '@/components/ReadPdf';
import PdfViewer from '@/components/ReadPdf';

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
  const [rapidapiProducts, setRapidapiProducts] = useState<TSimilarProduct[]>([]);
  const [dataSheet,setDataSheet] = useState<TDataSheetResult | null>(null)
 // const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const { id } = await params;
      try {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();
        setProduct(data);
        //AND application : ${data.APPLICATION}
        const query = `${data?.POLYMER} And Grade = ${data?.GRADE} AND Category = ${data?.CATEGORY}`;
  
        
        const response = await fetch(`/api/google-search?query=${query}&polymer=${data?.POLYMER}&grade=${data?.GRADE}&category=${data?.CATEGORY}&mfi=${data?.MFI}&brand=${data?.BRAND}`);
        const googleSearchresult = await response.json();
  
  
    
        //searching similar products from rapidAPI
        const rapidapi = await fetch(`/api/rapidapi?query=${data?.POLYMER}&category=${data?.CATEGORY}&sort=relevance`);
        const rabidapiData = await rapidapi.json();
        console.log(dataSheet)
       setGoogleProducts([...googleSearchresult?.data?.items]);
       setDataSheet(googleSearchresult?.dataSheetData?.items[0])
       setRapidapiProducts(rabidapiData?.data?.products)
       console.log('rapid api data',rabidapiData)
        console.log('googleSearchresult',googleSearchresult)
      
      } catch (error) {
      console.log(error)    
      }
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
        className="h-[30vh] bg-grad-5 flex flex-col items-center justify-center  text-white text-center p-4"
       
      >
        <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg">{product?.BRAND} - {product?.GRADE}</h1>
        <p className="text-xl md:text-xl font-semibold mt-4 drop-shadow-md">{product?.CATEGORY}</p>
      </div>

      {/* Content Layout */}
      <div className="w-full bg-grad-6  min-h-screen max-w-full overflow-hidden">
      <div className="max-w-[90vw] mx-auto py-4 grid lg:grid-cols-2 gap-8">
        {/* Product Details (Sticky) */}
        <div className="space-y-4 max-w-full">
          {/* Product Detail */}
          <div className="bg-[#1E293B] text-white p-8 rounded-lg shadow-lg h-fit">
          <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
          <p><strong>Polymer:</strong> {product.POLYMER}</p>
          <p><strong>Category:</strong> {product.CATEGORY}</p>
          <p><strong>Brand:</strong> {product.BRAND}</p>
          <p><strong>Grade:</strong> {product.GRADE}</p>
          <p><strong>MFI:</strong> {product.MFI}</p>
          <p><strong>Application:</strong> {product.APPLICATION}</p>
        </div>
        <div className="product-slider max-w-full overflow-hidden">
          <SimilarProductsSlider similarProducts={rapidapiProducts} />
        </div>
        </div>

        {/* Google Search Results (Scrollable) */}
        <div className="max-w-[90vw] md:max-w-[680px] lg:max-w-2xl bg-gray-100 p-6 rounded-lg shadow-lg h-[300px] lg:h-[80vh] max-h-[80vh] overflow-y-auto pb-20 lg:pb-0">
         
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

      <div className="mt-12">
        <h3 className="text-2xl text-center font-semibold">
          Product DataSheet
        </h3>
       
        {dataSheet?.link && (
          
          <PdfViewer pdfUrl={dataSheet?.link} />
        )}
      </div>
      </div>
    </>
  );
}





  
