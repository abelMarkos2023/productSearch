"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { TProduct } from '../product/[id]/page';

export default function DataTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/upload?page=${currentPage}&limit=${itemsPerPage}`);
      const result = await res.json();
      setData(result.data);
      setTotalPages(result.totalPages);
    }
    fetchData();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
        <Link href={'/'}>Back</Link>
      </nav>

      {/* Hero Section */}
      <div
        className="h-[50vh] flex flex-col items-center justify-center text-center text-white px-6 mb-12"
        style={{ 
          backgroundImage: "url('/list.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-7xl font-bold drop-shadow-lg">Explore Our Products</h1>
        <p className="text-4xl mt-4 drop-shadow-md">Browse through our extensive product catalog</p>
      </div>

  

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 py-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left">
              <th className="p-4">POLYMER</th>
              <th className="p-4">CATEGORY</th>
              <th className="p-4">BRAND</th>
              <th className="p-4">GRADE</th>
              <th className="p-4">MFI</th>
              <th className="p-4">APPLICATION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item:TProduct, index) => (
              <tr key={index} className="odd:bg-gray-50 even:bg-gray-100 hover:bg-blue-50 transition duration-300">
                <td className="p-4 border-b">{item.POLYMER}</td>
                <td className="p-4 border-b">{item.CATEGORY}</td>
                <td className="p-4 border-b">{item.BRAND}</td>
                <td className="p-4 border-b">{item.GRADE}</td>
                <td className="p-4 border-b">{item.MFI}</td>
                <td className="p-4 border-b">{item.APPLICATION}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-3">
        <button 
          className={`px-5 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`} 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 rounded-lg">Page {currentPage} of {totalPages}</span>
        <button 
          className={`px-5 py-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`} 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
