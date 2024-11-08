import React from "react";
import { Error } from "../_types/types";

export default function ErrorComponent({ error }: Error) {
  const prgph = error.split(":(");

  return (
    <div className="mt-16">
      <h1 className="sm:text-5xl text-[28px] font-semibold">{prgph[0]} :(</h1>
      <p className="mt-2 font-thin sm:text-2xl text-xl ">{prgph[1]}</p>
    </div>
  );
}
