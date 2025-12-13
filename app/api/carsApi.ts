import { CarCard } from "../_types/types";

export async function getCars(car?: string, make?: string, limit?: number) {
  try {
    const apiKey = "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA";

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${car}&limit=${
      limit ? limit : "7"
    }`;

    console.log("🌐 RAPIDAPI'ye İstek Atılıyor:", url);

    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey || "",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      console.log("API Error:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    console.log("✅ BAŞARILI! Alınan Araba Sayısı:", data.length);

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

// export async function getCars(car?: string, make?: string, limit?: number) {
//   const isProduction = process.env.NODE_ENV === "production";
//   const baseUrl = isProduction
//     ? "https://car-hub-by-rm.vercel.app"
//     : "http:127.0.0.1:3000";

//   try {
//     const cars = await fetch(
//       `${baseUrl}/api/cars?make=${make}&model=${car}&limit=${
//         limit ? limit : "7"
//       }`
//     ).then((r) => r.json());

//     if (!cars || cars.length === 0) {
//       return [];
//     }

//     return cars;
//   } catch (err) {
//     console.error("API Error:", err);
//     return [];
//   }
// }

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export function generateCarPhotos(car: CarCard, angle?: string) {
  const url = new URL("https://cdn.imagin.studio/car-image-api");

  const { make, year, model } = car;

  url.searchParams.append("customer", "img");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
}
