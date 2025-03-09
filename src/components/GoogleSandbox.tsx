
"use client";

import { useEffect } from "react";

const SEARCH_ENGINE_ID2 = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID2;

const GoogleSandbox = () => {
  useEffect(() => {
    if (window?.document) {
      // Remove any previous instance of the script
      const existingScript = document.querySelector(
        `script[src*="cse.google.com/cse.js"]`
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Create new script
      const script = document.createElement("script");
      script.src = `https://cse.google.com/cse.js?cx=${SEARCH_ENGINE_ID2}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      {/* Google Search Box and Results */}
      <div className="gcse-search" data-as_sitesearch="/"></div>
      <div className="gcse-searchresults-only"></div>
    </div>
  );
};

export default GoogleSandbox;
