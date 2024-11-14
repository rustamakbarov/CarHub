import Image from "next/image";
import React from "react";
import logo from "../logo.svg";

export default function Footer() {
  let year = 2024;

  function getTime() {
    const currentYear = new Date().getFullYear();
    year = currentYear;
  }

  getTime();

  return (
    <footer className=" bg-gray-50 ">
      <div className="max-w-7xl px-3 w-full mx-auto flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-0 justify-between items-center my-10">
        <div className="text-sm sm:text-base md:text-lg">
          <Image src={logo} alt="Logo" height="64" width="120" quality={80} />
        </div>
        <div>
          <p className="font-thin">CarHub {year} All Rights Reserved &#xA9;</p>
        </div>
        <div>
          <p className="font-thin">
            Designed by <strong>Rustam Akbarov</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
