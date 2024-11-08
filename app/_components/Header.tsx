import React from "react";
import Image from "next/image";
import logo from "../logo.svg";

export default function Header() {
  return (
    <header className="max-w-7xl w-full mx-auto py-6 px-3">
      <div className="h-8 relative flex justify-start">
        <Image src={logo} alt="Logo" height="64" width="120" quality={80} />
      </div>
    </header>
  );
}
