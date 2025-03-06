"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
      const query = `${data?.POLYMER} ${data?.GRADE}`;
      const response = await fetch(`/api/google-search?query=${query}`);
      const result = await response.json();
      setGoogleProducts(result.data.items);
    };
    fetchProduct();
  }, [params]);

  if (!product) {
    return <div className="text-center text-gray-700 text-lg mt-20">Loading...</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <div 
        className="h-[50vh] flex flex-col items-center justify-center bg-cover bg-center px-6 mb-12 text-white text-center"
        style={{ backgroundImage: "url('/bg3.webp')" }}
      >
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">{product?.BRAND} - {product?.GRADE}</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-4 drop-shadow-md">{product?.CATEGORY}</p>
      </div>

      {/* Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-8">
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
          {googleProducts.length > 0 ? (
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
    </>
  );
}



// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// type GoogleSearchResult = {
//   kind: string; // "customsearch#result"
//   title: string;
//   htmlTitle: string;
//   link: string;
//   displayLink: string;
//   formattedUrl: string;
//   htmlFormattedUrl: string;
//   snippet?: string;
//   htmlSnippet?: string;
//   mime?: string; // e.g., "application/pdf"
//   fileFormat?: string;
//   pagemap?: {
//     cse_thumbnail?: {
//       src: string;
//       width: string;
//       height: string;
//     }[];
//     cse_image?: {
//       src: string;
//     }[];
//     metatags?: {
//       moddate?: string;
//       creator?: string;
//       creationdate?: string;
//       producer?: string;
//       author?: string;
//       title?: string;
//       snippet?: string;
//     }[];
//   };
// };


// export default function ProductDetail({ params }) {
//   const [product, setProduct] = useState(null);
//   const [googleProducts,setGoogleProducts] = useState<GoogleSearchResult[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProduct = async () => {
//         const { id } = await params;

//         console.log(id)
//         const res = await fetch(`/api/product/${id}`);
//         const data = await res.json();
//         setProduct(data);
//         const query = `${data?.POLYMER} ${data?.GRADE} `;
//         const response = await fetch(`/api/google-search?query=${query}`);
//         const result = await response.json();
//         console.log(result)
//         setGoogleProducts(result.data.items);
//     };
    
//     fetchProduct();
//   }, [params]);


  

//   if (!product) {
//     return <div className="text-center text-white text-lg mt-20">Loading...</div>;
//   }

//   return (
//     <>
//     <div 
//       className="h-[50vh] flex flex-col items-center bg-cover bg-center px-6 mb-12"
//       style={{ 
//         backgroundImage: "url('/bg3.webp')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Navbar */}
//       <nav className="w-full bg-white bg-opacity-90 shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
//         <h2 className="text-2xl font-bold text-gray-800">Product Detail</h2>
//         <button onClick={() => router.back()} className="text-gray-600 hover:text-blue-600">Back</button>
//       </nav>

//       {/* Hero Section */}
//       <div className="flex flex-col items-center justify-center text-center text-white py-32">
//         <h1 className="text-7xl font-bold drop-shadow-lg">{product.BRAND} - {product.GRADE}</h1>
//         <p className="text-4xl font-semibold mt-4 drop-shadow-md">{product.CATEGORY}</p>
//       </div>
//       </div>

//       {/* Product Details */}
//       <div className="grid lg:grid-cols-2 gap-4 max-w-7xl mx-auto">
//       <div className="bg-[#7fc6d9] bg-opacity-90 p-8 rounded-lg shadow-lg w-ful text-white text-lg">
//         <p><strong>Polymer:</strong> {product.POLYMER}</p>
//         <p><strong>Category:</strong> {product.CATEGORY}</p>
//         <p><strong>Brand:</strong> {product.BRAND}</p>
//         <p><strong>Grade:</strong> {product.GRADE}</p>
//         <p><strong>MFI:</strong> {product.MFI}</p>
//         <p><strong>Application:</strong> {product.APPLICATION}</p>
//       </div>
//       <div className="bg-[#7fc6d9] bg-opacity-90 p-8 rounded-lg shadow-lg w-ful text-white text-lg">

//         <div className="text-3xl text-center font-semibold">Google Search Result</div>
//         {
//             googleProducts.length > 0 ? (googleProducts.map((product:GoogleSearchResult, index) => (
//               <div key={index}>
//                   <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
//                   <p className="text-gray-600 font-medium">{product.snippet}</p>
//                  {
//               product.pagemap?.cse_image?.[0]?.src ? (
//                 <Image 
//                   width={300} 
//                   height={400} 
//                   src={product.pagemap.cse_image[0].src} 
//                   alt={product.title} 
//                 />
//               ) : (
//                 <p className="text-gray-600">No image available</p>
//               )
//               }
//               </div>
//           )) ) : <h1>No Matching products</h1>
//         }
//       </div>
//       </div>
//     </>
//   );
// }
