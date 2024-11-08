"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Limit {
  limit?: number;
}

export default function ShowMoreButton({ limit }: Limit) {
  const [isOpen, setIsOpen] = useState(limit === 7 ? false : true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    limit = isOpen ? 7 : 14;

    const params = new URLSearchParams(searchParams);
    params.set("limit", String(limit));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsOpen((isOpen) => !isOpen);
  }
  return (
    <button
      className="rounded-full outline-0 w-32 py-3 px-4 text-white bg-blue-600"
      onClick={handleClick}
    >
      {limit === 14 ? "Show Less" : "Show More"}
    </button>
  );
}
