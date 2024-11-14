import React, { Suspense } from "react";
import HeroSection from "../../app/_components/HeroSection";
import CarsList from "./CarsList";
import Spinner from "./Spinner";
import { Filter } from "../_types/types";

export default function Main({ filter }: Filter) {
  return (
    <main className="max-w-7xl px-3 w-full mx-auto relative lg:static overflow-x-hidden lg:overflow-x-auto">
      <HeroSection />
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-4xl" id="discover">
          Car Catalogue
        </h3>
        <p className="font-light">Explore our cars you might like</p>
      </div>
      <Suspense fallback={<Spinner />}>
        <CarsList filter={filter} />
      </Suspense>
    </main>
  );
}
