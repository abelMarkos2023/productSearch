"use client";

import { useState } from "react";

export default function PdfReader({url}:{url:string}) {
  const [pdfText, setPdfText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPdfText = async () => {
    setLoading(true);
    //const url = "https://www.example.com/sample.pdf"; // Replace with your PDF URL

    try {
      const res = await fetch(`/api/pdf-reader?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setPdfText(data.text);
    } catch (error) {
      console.error("Error fetching PDF", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchPdfText}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Read PDF
      </button>

      {loading && <p className="mt-2">Loading...</p>}

      {pdfText && (
        <div className="mt-4 border p-2 bg-gray-100 rounded-md">
          <h2 className="text-lg font-bold">Extracted Text:</h2>
          <pre className="whitespace-pre-wrap">{pdfText}</pre>
        </div>
      )}
    </div>
  );
}
