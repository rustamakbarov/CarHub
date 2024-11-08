"use client";

import React from "react";
export default function HeroButton() {
  function handleClick() {
    const discoverSection = document.getElementById("discover");
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <button
      className="rounded-full outline-0 w-32 py-3 px-4 text-white bg-blue-600"
      onClick={handleClick}
    >
      Explore Cars
    </button>
  );
}
