import React from "react";
import { useTranslation } from "react-i18next";
import logoAudi from "/src/assets/images/logo-audi.png";
import logoBmw from "/src/assets/images/logo-bmw.png";
import logoToyota from "/src/assets/images/logo-toyota.png";
import logoNissan from "/src/assets/images/logo-nissan.png";
import logoLandRover from "/src/assets/images/logo-land-rover.png";
import logoBentley from "/src/assets/images/logo-bentley.png";
import logoKia from "/src/assets/images/logo-kia.png";

const CarBrandScroller = () => {

  const images = [
    logoAudi,
    logoBmw,
    logoToyota,
    logoNissan,
    logoLandRover,
    logoBentley,
    logoKia,
  ];

const [t, i18n] = useTranslation();

  return (
    <div className="overflow-hidden w-full bg-white py-6">
      <div className={`whitespace-nowrap ${i18n.language === "ar"? "flex animate-scroll-left" : "flex animate-scroll-right"}`}>
        {[...images, ...images].map((brand, index) => (
          <img
            key={index}
            src={brand}
            className="h-16 lg:mx-8 mx-4 inline-block"
          />
        ))}
      </div>
    </div>
  );
};

export default CarBrandScroller;
