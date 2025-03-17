import { NextRequest, NextResponse } from "next/server";

// function extractDetail(text:string, label:string) {
//     const regex = new RegExp(`${label}\\s*([^,]*)`, 'i');
//     const match = text.match(regex);
//     return match ? match[1].trim() : 'Not available';
//   }
export  async function GET(req:NextRequest) {

    const { searchParams } = new URL(req.url);
    console.log(searchParams.get("query"));

    const query = searchParams.get("query");
    const polymer = searchParams.get("polymer");
    const brand = searchParams.get("brand");
    const grade = searchParams.get("grade");
   // const { query } = req.query;

    if (!query) return NextResponse.json({ error: "Query is required" }, { status: 500 })

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID2;

    console.log(API_KEY,SEARCH_ENGINE_ID)

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;

    


  const dataSheetQuery = `POLYMER ${polymer} Grade=${grade} Brand=${brand} datasheet filetype:pdf`
    try {
        const response = await fetch(url);
        const data = await response.json()

        const dataSheet = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(dataSheetQuery)}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`)
        const dataSheetData = await dataSheet.json();
        console.log('DataSheet', dataSheetData)
        //const data = await response.json();
       // console.log(data)
            
          return NextResponse.json( {data,dataSheetData} , { status: 200 })
    } catch (err) {
       // res.status(500).json({ err,error: "Failed to fetch search results" });
       return NextResponse.json({ err,error: 'Internal Server Error' }, { status: 500 })
    }
}
