import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


type Product = {
    title:string,
     description?:string, 
     price?:number,
     product_id?:string,
     thumbnail:string
    product_link?:string
    }
export default function SearchResults({ products }:{products:Product[]}) {
    const [view, setView] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="container mx-auto p-6">
            {/* Toggle Buttons */}
            <div className="flex justify-end mb-4">
                <button 
                    className={`px-4 py-2 mx-2 rounded ${view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`} 
                    onClick={() => setView("grid")}
                >
                    Grid View
                </button>
                <button 
                    className={`px-4 py-2 mx-2 rounded ${view === "list" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`} 
                    onClick={() => setView("list")}
                >
                    List View
                </button>
            </div>

            {/* Products Display */}
            <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "flex flex-col w-full gap-4 space-y-4"}>
                {currentProducts.map((product:Product) => (
                    <div 
                        key={product.product_id || product.title || product.price} 
                        className={`w-full ${view === "grid" ? "border p-4 rounded-lg" : "border p-4 flex items-start space-x-4 rounded-lg"}`}
                    >
                        <div className={view === "grid" ? "w-full h-80" : "w-3/5 h-60"}>
                            <Image 
                                src={product.thumbnail} 
                                alt={product.title} 
                                width={view === "grid" ? 400 : 240} 
                                height={view === "grid" ? 400 : 200} 
                                className={`rounded object-cover w-full  overflow-hidden h-full`}
                            />
                        </div>
                        <div className="flex flex-col items-start gap-4 mb-4">
                            <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
                            <p className="text-gray-600 font-bold text-2xl">{product.price}</p>
                            <Link className="px-4 py-2 rounded-lg shadow-lg bg-blue-400 text-white hover:bg-blue-600 transition duration-75" href={`${product.product_link}`} target="_blank">View Product Detail</Link>
                        </div>
                       
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
                <button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
