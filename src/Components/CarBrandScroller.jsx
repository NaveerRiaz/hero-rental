import React from "react";
import { useTranslation } from "react-i18next";

const CarBrandScroller = () => {

  const images = [
    "/src/assets/images/logo-audi.png",
    "/src/assets/images/logo-bmw.png",
    "/src/assets/images/logo-toyota.png",
    "/src/assets/images/logo-nissan.png",
    "/src/assets/images/logo-land-rover.png",
    "/src/assets/images/logo-bentley.png",
    "/src/assets/images/logo-kia.png",
  ];

const [t, i18n] = useTranslation();

  return (
    <div className="overflow-hidden w-full bg-white py-6">
      <div className={`whitespace-nowrap ${i18n.language === "ar"? "flex animate-scroll-left" : "flex animate-scroll-right"}`}>
        {[...images, ...images].map((brand, index) => (
          <img
            key={index}
            src={brand}
            className="h-16 mx-8 inline-block"
          />
        ))}
      </div>
    </div>
  );
};

export default CarBrandScroller;
