"use client"

import { useState } from "react";
import SearchResults from "./Products";

export default function ProductSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        const res = await fetch(`/api/search?query=${query}`);
        const data = await res.json();
        setResults(data.shopping_results || []);

        console.log(data.shopping_results)
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Product Search</h1>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search for a product..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {
            results.length > 0 &&  <SearchResults products = {results} />
            }
        </div>
    );
}





