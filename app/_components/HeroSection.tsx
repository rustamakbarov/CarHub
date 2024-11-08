import Image from "next/image";
import React from "react";
import hero_bg from "../_imgs/hero-bg.png";
import hero_car from "../_imgs/hero_car.png";
import HeroButton from "./HeroButton";

export default function HeroSection() {
  return (
    <section className="xl:flex block sm:py-12 xl:h-screen justify-between mb-16 md:mb-10">
      <div className="hero-title mb-12 text-black flex flex-col gap-9">
        <h1 className="sm:text-7xl lg:text-[80px] text-5xl leading-none font-semibold ">
          Find, book, rent a car &ndash; quick and super easy!
        </h1>
        <p className="font-thin sm:text-[26px] leading-[32px]">
          Streamline your car rental experience with our effortless booking
          process.
        </p>
        <HeroButton />
      </div>
      <div className="relative sm:static">
        <Image
          className="absolute object-cover bottom-[3%] left-[10%] md:left-[13%] md:top-[14%] xl:left-[45%] xl:top-[-13%]"
          src={hero_bg}
          alt="Hero Background"
        ></Image>
        <Image
          className="relative"
          src={hero_car}
          alt="Hero"
          width={"2400"}
          height={"1400"}
        ></Image>
      </div>
    </section>
  );
}
