"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import Spinner from "./Spinner";

interface CarListClientProps {
  children: React.ReactElement;
}

export default function CarListClient({ children }: CarListClientProps) {
  const params = useSearchParams();

  const filter = {
    model: params.get("model"),
    car: params.get("car"),
    fuel: params.get("fuel"),
    year: params.get("year"),
    limit: params.get("limit"),
  };

  return (
    <Suspense fallback={<Spinner />}>
      {React.cloneElement(children, { filter })}
    </Suspense>
  );
}
