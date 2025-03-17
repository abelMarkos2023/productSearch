
const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {

  return (
    <div className="flex mt-8 flex-col items-center w-full max-w-[90vw] mx-auto p-4 bg-white shadow-lg rounded-2xl">
      {/* Toolbar */}
      <div className="flex justify-between items-center w-full px-4 py-2 bg-gray-100 rounded-t-2xl">
        <h2 className="text-lg font-semibold text-gray-700">PDF Viewer</h2>
        {/*  */}
      </div>

      {/* PDF Viewer */}
      <div className="relative w-full h-[80vh]">
        <iframe
          src={pdfUrl}
          className="w-full h-full rounded-b-2xl border border-gray-200"
        />
      </div>
    </div>
  );
};

export default PdfViewer;
