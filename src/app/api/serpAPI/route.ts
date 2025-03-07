import { NextRequest, NextResponse } from 'next/server';
import SerpApi from 'google-search-results-nodejs';

const API_KEY = process.env.API_KEY; // Store this in your .env file

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get('name') || '';
    const brand = searchParams.get('brand') || '';
    const grade = searchParams.get('grade') || '';
  // const mfi = searchParams.get('mfi') || '';
    const application = searchParams.get('application') || '';

    console.log(name)
    
    console.log(brand)
    console.log(grade)
    console.log(application)

    function buildQuery({ brand, grade, application, mfi }:{brand?:string,grade?:string,application?:string,mfi?:string}) {
      const query:string[] = [];
      
      if (brand) query.push(`"${brand}"`);
      if (grade) query.push(`"${grade}"`);
      if (application) query.push(`"${application}"`);
      if (mfi) query.push(`"MFI ${mfi}"`);
      
      return query.join(" AND ") ;
    }
    
    const searchQuery = buildQuery({
      brand: name,
      grade: grade,
      //application: application,
     // mfi: mfi
    });
    
//     search.json({ q: searchQuery, num: 10 }, (data) => {
//       console.log(data["organic_results"]);
//     });
// //"Application: ${application}"
//     // Construct the search query
//     const query = `${name}  "Grade: ${grade}" `;

    const search = new SerpApi.GoogleSearch(API_KEY);

    // Perform Google search
    const result = await new Promise((resolve, reject) => {
      search.json({ q: searchQuery, location: "United States", hl: "en" }, (data) => {
        if (data) resolve(data);
        else reject(new Error("Failed to fetch search results"));
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Google Search failed', details: error }, { status: 500 });
  }
}
