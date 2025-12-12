import { CarCard } from "../_types/types";

// export async function getCars(car?: string, make?: string, limit?: number) {
//   // try {
//   //   // Vercel'deki çevresel değişkeni kullanıyoruz
//   //   const apiKey = process.env.RAPIDAPI_KEY;

//   //   // URL'yi çevresel değişken ile dinamik hale getiriyoruz
//   //   const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${car}&limit=${
//   //     limit ? limit : "7"
//   //   }`;

//   //   // API isteğini yapıyoruz, headers kısmında çevresel değişkeni gönderiyoruz
//   //   const response = await fetch(url, {
//   //     headers: {
//   //       "X-RapidAPI-Key": apiKey || "", // Eğer apiKey null veya undefined ise, boş string gönderiyoruz
//   //       "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
//   //     },
//   //   }).then((res) => res.json());

//   //   return response;
//   // } catch (err) {
//   //   alert(err);
//   // }
//   try {
//     const apiKey = process.env.RAPIDAPI_KEY;
//     const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${car}&limit=${
//       limit ? limit : "7"
//     }`;

//     const response = await fetch(url, {
//       headers: {
//         "X-RapidAPI-Key": apiKey || "",
//         "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("API Response:", data); // API yanıtını logla
//     return data;
//   } catch (err) {
//     console.error("API Error:", err); // Hata detaylarını logla
//     throw err;
//   }
// }

export async function getCars(car?: string, make?: string, limit?: number) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${car}&limit=${
      limit ? limit : "7"
    }`;

    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey || "",
        "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      return [];
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

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
