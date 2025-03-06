'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.log(error)
      alert(`Upload failed, please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
        <h2 className="text-2xl font-bold text-gray-800">Upload Excel File</h2>
        <button onClick={() => router.back()} className="text-gray-600 hover:text-blue-600">Back</button>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-screen flex flex-col gap-8 items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bg.webp')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-white text-center">
          <h1 className="text-4xl font-bold">Upload Your Excel File</h1>
          <p className="mt-2 text-lg">Easily upload and manage your data.</p>
        </div>
      

      {/* Upload Form */}
      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">Select File to Upload</h3>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input 
            type="file" 
            accept=".xls,.xlsx, .xlsm" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className="border p-2 rounded-lg" 
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
