"use client";
import { HiSearch } from "react-icons/hi";
import { FaCar } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";

import { useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SearchBar() {
  const [car, setCar] = useState("");
  const [model, setModel] = useState("");
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function changeUrl(car: string, model: string) {
    const enteredCar = car.replace(/[^a-zA-Z\s]/g, "").trim();
    const enteredModel = model.replace(/[^a-zA-Z0-9]/g, "").trim();

    if (!enteredCar || !enteredModel) {
      setError(true);
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("car", enteredCar);
      params.set("model", enteredModel);
      params.delete("fuel");
      params.delete("year");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      setCar("");
      setModel("");
      setError(false);
    }
  }

  return (
    <>
      <div className="flex w-full">
        <div className="flex flex-1 md:flex-none w-40 sm:w-48">
          <input
            type="text"
            value={car}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCar(e.target.value)
            }
            placeholder="Search Car (Toyota)"
            className="p-2 pl-[26px] w-full sm:w-auto sm:pl-8 text-xs sm:text-base text-gray-700 bg-gray-100 outline-none relative rounded-sm"
          />
          <span className=" p-2 flex mt-[2px] md:mt-1 absolute text-gray-500">
            <FaCar />
          </span>
        </div>
        <div className="flex flex-1 md:flex-none w-40 sm:w-48">
          <input
            type="text"
            value={model}
            placeholder="Search Model (Prado)"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setModel(e.target.value)
            }
            className="p-2 pl-[26px] w-full sm:w-auto sm:pl-8 text-xs sm:text-base text-gray-700 bg-gray-100 outline-none relative rounded-sm"
          />
          <span className=" p-2 flex mt-[2px] md:mt-1 absolute text-gray-500">
            <GiCarWheel />
          </span>
        </div>
        <button
          onClick={() => changeUrl(car, model)}
          className="bg-gray-100 p-2 ml-0 sm:ml-[37px] text-gray-500"
        >
          <HiSearch />
        </button>
      </div>

      {error ? (
        <p className="text-red-700 text-sm mt-1">
          Please enter the valid car or model name{" "}
        </p>
      ) : null}
    </>
  );
}
