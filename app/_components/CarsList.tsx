import React from "react";
import { getCars } from "../api/carsApi";
import CustomFilter from "./CustomFilter";
import SearchBar from "./SearchBar";
import { CarCard, Filter } from "../_types/types";
import CarCart from "./CarCard";
import ErrorComponent from "./ErrorComponent";
import ShowMoreButton from "./ShowMoreButton";

export default async function CarsList({ filter }: Filter) {
  const cars = (await getCars("q5", "audi")) || [];

  let displayedCars: CarCard[] = [];
  let isEmpty = false;
  let years: number[] = [];

  if (!cars.length) isEmpty = true;

  displayedCars = cars;

  years = Array.from(
    new Set(
      (Array.isArray(displayedCars) ? displayedCars : []).map((car) => car.year)
    )
  );

  if (
    (typeof filter === "object" && filter.model) ||
    (typeof filter === "object" && filter.car)
  ) {
    displayedCars = await getCars(filter.model, filter.car);
    years = Array.from(
      new Set(
        (Array.isArray(displayedCars) ? displayedCars : []).map(
          (car) => car.year
        )
      )
    );
  }

  if (typeof filter === "object" && filter.limit) {
    displayedCars = await getCars(
      displayedCars[0]?.model,
      displayedCars[0]?.make,
      Number(filter.limit)
    );
  }

  if (
    (typeof filter === "object" && filter.fuel) ||
    (typeof filter === "object" && filter.year)
  ) {
    if (filter.year && filter.fuel) {
      displayedCars = displayedCars?.filter(
        (car: CarCard) =>
          car.year === Number(filter.year) && car.fuel_type === filter.fuel
      );
    } else if (filter.year) {
      displayedCars = displayedCars?.filter(
        (car: CarCard) => car.year === Number(filter.year)
      );
    } else if (filter.fuel) {
      displayedCars = displayedCars?.filter(
        (car: CarCard) => car.fuel_type === filter.fuel
      );
    }
  }

  if (!displayedCars.length) isEmpty = true;

  return (
    <section className="mt-8 mb-20">
      <div className="flex flex-col sm:flex-row w-full items-center justify-between">
        <div className="search-bar w-full">
          <SearchBar />
        </div>
        <div className="flex w-full sm:justify-end justify-start mt-5 sm:mt-0 gap-10">
          <CustomFilter title="Fuel" options={["Gas", "Electricity"]} />
          <CustomFilter title="Year" options={years} />
        </div>
      </div>

      {!isEmpty ? (
        <>
          <div className="block md:grid md:grid-cols-3 mt-10 gap-10">
            {displayedCars.map((car: CarCard, index: number) => (
              <CarCart car={car} key={index} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <ShowMoreButton
              limit={
                typeof filter === "object" && "limit" in filter
                  ? Number(filter.limit)
                  : 7
              }
            />
          </div>
        </>
      ) : (
        <ErrorComponent
          error={
            "Car and models are not found :( Please try to search another car and model or change filters ..."
          }
        />
      )}
    </section>
  );
}
