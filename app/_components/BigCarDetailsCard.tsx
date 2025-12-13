"use client";

import React, { useState } from "react";
import { CarCard } from "../_types/types";
import Image from "next/image";
import hero_car from "../_imgs/hero_car.png";
import { MdOutlineClose } from "react-icons/md";
import { generateCarPhotos } from "../api/carsApi";
import SpinnerMini from "./SpinnerMini";

interface CarProps {
  car: CarCard;
  setIsOpen: (isOpen: boolean) => void;
}

export default function BigCarDetailsCard({ car, setIsOpen }: CarProps) {
  const {
    transmission,
    displacement,
    cylinders,
    city_mpg,
    make,
    model,
    drive,
    year,
    fuel_type,
    class: carClass,
    combination_mpg,
    highway_mpg,
  } = car;

  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);

  return (
    <div className="fixed top-0 left-0 h-[100%] w-[100%] backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white px-5 py-5 rounded-md w-11/12 sm:w-[500px] shadow-sm">
        <div className="relative mb-4 h-40 w-full bg-[url('/pattern.png')] bg-cover bg-center rounded-md">
          {isLoading1 && <SpinnerMini />}
          <Image
            fill
            className={`object-cover pb-4 transition-all duration-500 ${
              isLoading1 ? "opacity-0" : "opacity-100"
            }`}
            src={generateCarPhotos(car)}
            alt="car"
            onLoad={() => setIsLoading1(false)}
          />
          <div className="absolute top-[-10px] right-[-10px]">
            <button
              className="bg-gray-200 h-8 w-8 font-bold flex justify-center items-center text-black rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <MdOutlineClose className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className=" flex gap-1 h-30 w-full">
          <div className="p-2 relative h-24 w-full bg-blue-100 flex-1 rounded-md">
            {isLoading2 && <SpinnerMini />}
            <Image
              fill
              src={generateCarPhotos(car, "29")}
              alt="Car Small "
              className={`object-cover transition-all duration-500 ${
                isLoading2 ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsLoading2(false)}
            />
          </div>
          <div className="p-2 relative h-24 w-full bg-blue-100 flex-1 rounded-md">
            {isLoading3 && <SpinnerMini />}
            <Image
              fill
              src={generateCarPhotos(car, "33")}
              alt="Car Small "
              className={`object-cover transition-all duration-500 ${
                isLoading3 ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsLoading3(false)}
            />
          </div>
          <div className="p-2 relative h-24 w-full bg-blue-100 flex-1 rounded-md">
            {isLoading4 && <SpinnerMini />}
            <Image
              fill
              src={generateCarPhotos(car, "13")}
              alt="Car Small "
              className={`object-cover transition-all duration-500 ${
                isLoading4 ? "opacity-0 " : "opacity-100"
              }`}
              onLoad={() => setIsLoading4(false)}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold capitalize">
            {make} {model}
          </h3>
        </div>

        <div className="mt-4">
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">City Mpg</span>
            <span>{city_mpg}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Class</span>
            <span>{carClass}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Combination Mpg</span>
            <span>{combination_mpg}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Cylinders</span>
            <span>{cylinders}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Displacement</span>
            <span>{displacement}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Drive</span>
            <span>{drive}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Fuel Type</span>
            <span>{fuel_type}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Highway Mpg</span>
            <span>{highway_mpg}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Car</span>
            <span className="uppercase">{make}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Model</span>
            <span className="capitalize">{model}</span>
          </div>
          <div className="flex mb-1 items-center justify-between ">
            <span className="text-gray-400">Transmission</span>
            <span>{transmission}</span>
          </div>
          <div className="flex items-center justify-between ">
            <span className="text-gray-400">Year</span>
            <span>{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
