"use client";

import React, { useState } from "react";
import { OptionFilter } from "../_types/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CustomFilter({ title, options }: OptionFilter) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const title = selectedOption.getAttribute("title");
    const value = e.target.value;

    const params = new URLSearchParams(searchParams);
    params.set(`${title?.toLocaleLowerCase()}`, value.toLocaleLowerCase());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="flex items-center">
      <select
        onChange={(e) => handleChange(e)}
        className="outline-none cursor-pointer shadow-md rounded-md p-2"
      >
        <option defaultChecked hidden value="">
          {title}
        </option>
        {title === "Fuel" ? (
          <>
            {options.map((option: string | number) => (
              <option
                key={option}
                className="cursor-pointer hover:bg-blue-50"
                value={option}
                title={title}
              >
                {option}
              </option>
            ))}
          </>
        ) : (
          <>
            {options.map((option) => (
              <option
                key={option}
                title={title}
                className=" cursor-pointer"
                value={option}
              >
                {option}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
