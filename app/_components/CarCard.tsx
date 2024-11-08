"use client";

import React, { useState } from "react";
import { CarCard } from "../_types/types";
import { calculateCarRent, generateCarPhotos } from "../_api/carsApi";
import Image from "next/image";
import { RiGasStationFill } from "react-icons/ri";
import { GiCartwheel } from "react-icons/gi";
import { PiSteeringWheelLight } from "react-icons/pi";
import BigCarDetailsCard from "./BigCarDetailsCard";
import SpinnerMini from "./SpinnerMini";

interface CarCartProps {
  car: CarCard;
}

export default function CarCart({ car }: CarCartProps) {
  const { transmission, city_mpg, make, model, drive, year } = car;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const carRent = calculateCarRent(city_mpg, year);

  function handleLoad() {
    setIsLoading(false);
  }

  return (
    <>
      <div className="mb-5 sm:mb-0  group flex flex-col p-6 justify-center items-start text-black-100 bg-[#F5F8FF] hover:bg-white hover:shadow-md rounded-3xl">
        <h2 className="font-semibold capitalize">
          {make} {model}
        </h2>

        <div className="mt-5">
          <p className="flex font-extrabold text-[32px]">
            <span className="self-start text-[14px] font-semibold">$</span>
            {carRent}
            <span className="self-end font-medium text-[14px]">/day</span>
          </p>
        </div>

        <div className="relative w-full h-52 object-contain">
          {isLoading && <SpinnerMini />}
          <Image
            src={generateCarPhotos(car)}
            fill
            alt="Car"
            className={`object-cover transition-all duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={handleLoad}
          />
        </div>

        <div className=" relative w-full flex justify-between mt-2">
          <div className="w-full flex flex-col gap-2 items-center group-hover:invisible">
            <span>
              <PiSteeringWheelLight className="w-5 h-5 text-purple-600" />
            </span>
            <p className="text-[14px]">
              {transmission === "a" ? "Automatic" : "Manual"}
            </p>
          </div>
          <div className="w-full flex flex-col gap-2 items-center group-hover:invisible">
            <span>
              <GiCartwheel className="w-5 h-5 text-orange-600" />
            </span>
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
          <div className="w-full flex flex-col gap-2 items-center group-hover:invisible">
            <span>
              <RiGasStationFill className="w-5 h-5 text-green-600" />
            </span>
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>

          <div className="hidden group-hover:flex  absolute bottom-0 w-full z-10">
            <button
              onClick={() => setIsOpen(true)}
              className="w-full py-2 text-white text-[14px] font-bold  rounded-full bg-blue-600"
            >
              View More
            </button>
          </div>
        </div>
      </div>
      {isOpen && <BigCarDetailsCard setIsOpen={setIsOpen} car={car} />}
    </>
  );
}
