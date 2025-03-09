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
   // const { query } = req.query;

    if (!query) return NextResponse.json({ error: "Query is required" }, { status: 500 })

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const SEARCH_ENGINE_ID = process.env.NEXT_PUBLIC_SEARCH_ENGINE_ID2;

    console.log(API_KEY,SEARCH_ENGINE_ID)

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;

    


  //const url = `https://www.googleapis.com/customsearch/v1?q=iphone&cx=c1b45ecaee5804e48&key=AIzaSyBfX6OZ-O4VPKO3IBwk0Mhjz4DZI9w6GTw


    try {
        const response = await fetch(url);
        const data = await response.json()
        //const data = await response.json();
        console.log(data)
            
          return NextResponse.json( data , { status: 200 })
    } catch (err) {
       // res.status(500).json({ err,error: "Failed to fetch search results" });
       return NextResponse.json({ err,error: 'Internal Server Error' }, { status: 500 })
    }
}
