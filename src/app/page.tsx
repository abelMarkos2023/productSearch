
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { TProduct } from './product/[id]/page';
import { useSearch } from './context/SearchContext';

export default function ProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const { searchResults, setSearchResults } = useSearch();
  const [results, setResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    console.log(results)
    setLoading(true); // Start loading

    try {
      const res = await fetch(`/api/searchable?query=${searchQuery}`);
      const data = await res.json();
      setResults(data);
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  return (
    <div>
      <div 
        className="h-[75vh] flex flex-col gap-8 bg-cover bg-center px-6"
        style={{ 
          backgroundImage: "url('/bg1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "75vh"
        }}
      >
        {/* Navbar */}
        <nav className="w-full bg-white bg-opacity-90 shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
          <h2 className="text-2xl font-bold text-gray-800">Product Search</h2>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
            <li><Link href="/products" className="text-gray-600 hover:text-blue-600">Products</Link></li>
          </ul>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center gap-8 justify-center flex-grow text-center text-white py-20">
          <h1 className="text-5xl font-bold drop-shadow-lg">Find Your Perfect Product</h1>
          <p className="text-lg mt-4 drop-shadow-md">Search for a product by any field and discover the details instantly.</p>
          
          {/* Search Box at Bottom of Hero */}
          <div className="relative z-10 flex justify-center w-full pb-10">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex items-center space-x-2 w-full max-w-2xl">
              <input 
                type="text" 
                placeholder="Search for a product..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="placeholder-gray-400 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <button 
                onClick={handleSearch} 
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                ) : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-grad-1 w-full">
        {/* Search Results Section */}
        <div className="w-full max-w-[90vw] mx-auto pb-20 flex-grow overflow-y-auto bg-opacity-90 p-6 rounded-lg" style={{ minHeight: "50vh" }}>
          {
            searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product: TProduct) => (
                  <div 
                    key={product?._id} 
                    className="p-6 bg-[#3b6075] bg-opacity-90 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105 text-white border border-green-700"
                    onClick={() => router.push(`/product/${product?._id}`)}
                  >
                    <h3 className="text-2xl font-bold">
                      {product?.BRAND} - {product?.GRADE}
                    </h3>
                    <p className="mt-2">
                      <span>Category :</span>  <span>{product?.CATEGORY}</span>
                    </p>
                    <p>
                      <span>Application :</span> <span>{product?.APPLICATION}</span>
                    </p>
                    <p><span>MFI :</span> <span>{product?.MFI}</span></p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white text-center text-xl">Search for a product by name, brand, grade, or type {"mfi 2"} to search for a specific MFI value product.</p>
            )
          }
        </div>
      </div>
    </div>
  );
}
