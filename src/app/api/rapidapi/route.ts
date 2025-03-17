import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const category = searchParams.get('category')

  

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

const API_KEYS = [{
  key: process.env.RAPIDAPI_KEY_ALIEXPRESS,
  host: 'aliexpress-datahub.p.rapidapi.com',
},
{
  key: process.env.RAPIDAPI_KEY_AMAZON,
  host: 'real-time-amazon-data.p.rapidapi.com',
},
{
  key: process.env.RAPIDAPI_KEY_TAOBAO,
  host: 'open-taobao-api.p.rapidapi.com',
}
]


console.log(query)
  try {
    const response = await axios.get(`https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(query)}&category=${category}&sort=relevance`, {
      //params: { query, country: "US" }, // Adjust as needed
      headers: {
        "X-RapidAPI-Key": API_KEYS[1].key,
        "X-RapidAPI-Host": API_KEYS[1].host,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error,err: "Failed to fetch products" }, { status: 500 });
  }

 
}
