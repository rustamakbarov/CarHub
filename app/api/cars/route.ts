// app/api/cars/route.ts
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const limit = searchParams.get("limit");

  const apiKey =
    process.env.RAPIDAPI_KEY ||
    "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA";
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&limit=${
    limit ? limit : "7"
  }`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, errorText);
      return Response.json([]);
    }

    const data = await response.json();
    if (!data || data.length === 0) {
      return Response.json([]);
    }

    return Response.json(data);
  } catch (err) {
    console.error("API Error:", err);
    return Response.json([]);
  }
}
