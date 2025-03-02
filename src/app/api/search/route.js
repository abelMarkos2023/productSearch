export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const query = searchParams.get("query");

    if (!query) {
        return Response.json({ error: "Query parameter is required" }, { status: 400 });
    }

    const apiKey = process.env.API_KEY;
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${query}&api_key=${apiKey}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        return Response.json(data);
    } catch (err) {
        return Response.json({ error: "Failed to fetch data",err }, { status: 500 });
    }
}
