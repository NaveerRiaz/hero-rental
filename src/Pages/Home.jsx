import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import Footer from "../Components/Footer";
import { Link, useLocation } from "react-router-dom";
import db from "../firebase";
import LuxuryCar from "/src/assets/images/hero-image-merc.png";
import EconomyCar from "/src/assets/images/economy.webp";
import logo from "/src/assets/images/logo.png";
import iconFilter from "/images/sliders-solid.svg";
import HamburgerMenu from "../Components/HamburgerMenu";
import VehicleListingCard from "../Components/VehicleListingCard";
import WhatsAppButton from "../Components/WhatsAppButton";
import { useTranslation } from "react-i18next";
import HeroVideo from "/src/assets/hero-video-optimized.mp4";

const images = [
  "/src/assets/images/logo-audi.png",
  "/src/assets/images/logo-bmw.png",
  "/src/assets/images/logo-toyota.png",
  "/src/assets/images/logo-nissan.png",
  "/src/assets/images/logo-land-rover.png",
  "/src/assets/images/logo-bentley.png",
  "/src/assets/images/logo-kia-white.png",
];

const Home = () => {
  const [vehicleType, setVehicleType] = useState(null);
  const [carsData, setCarsData] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [brands, setBrands] = useState(null);
  const [carTypes, setCarTypes] = useState(null);
  const [scroll, setScroll] = useState(0);
  const { hash } = useLocation();
  const [countLuxuryCars, setCountLuxuryCars] = useState(null);
  const [countEconomyCars, setCountEconomyCars] = useState(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr"; // Set RTL for Arabic
  };

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  const applyFilters = () => {
    if (priceMin !== "" && priceMax !== "")
      setFilters((prev) => {
        return { ...prev, price_min: priceMin, price_max: priceMax };
      });
    setShowFilters(false);
  };

  const removePriceFilter = () => {
    const filteredObj = Object.fromEntries(
      Object.entries(filters).filter(
        ([key]) => !["price_min", "price_max"].includes(key)
      )
    );
    // console.log(filteredObj);
    setPriceMax(null);
    setPriceMin(null);
    setFilters(filteredObj);
  };

  // handles scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScroll(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getData = async () => {
    setCarsData(null);
    const carsCol = collection(db, "Cars");
    const carSnapshot = await getDocs(carsCol);
    const carList = carSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return carList;
  };

  const selectCarType = (type) => {
    if (vehicleType) {
      if (type === vehicleType) {
        setVehicleType(null);
      } else {
        setVehicleType(type);
      }
    } else {
      setVehicleType(type);
    }
  };

  const toggleBrandFilter = (brandName) => {
    setFilters((prev) => {
      const updatedBrands = prev.brands ? [...prev.brands] : [];

      if (updatedBrands.includes(brandName)) {
        return {
          ...prev,
          brands: updatedBrands.filter((item) => item !== brandName),
        };
      } else {
        return { ...prev, brands: [...updatedBrands, brandName] };
      }
    });
  };

  const toggleTypeFilter = (carType) => {
    setFilters((prev) => {
      const updatedTypes = prev.types ? [...prev.types] : [];

      if (updatedTypes.includes(carType)) {
        return {
          ...prev,
          types: updatedTypes.filter((item) => item !== carType),
        };
      } else {
        return { ...prev, types: [...updatedTypes, carType] };
      }
    });
  };

  // get data from firebase
  useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";

    getData(db).then((data) => {
      if (carTypes === null) {
        const uniqueCarTypes = [...new Set(data.map((item) => item.Car_type))];
        setCarTypes(uniqueCarTypes);
      }

      if (!countEconomyCars) {
        const luxury_cars = data.reduce((acc, item) => {
          if (item.Car_status && item.Car_status.toLowerCase() === "luxury") {
            acc += 1;
          }
          return acc;
        }, 0); // Initial value set to 0
        setCountLuxuryCars(luxury_cars);

        const econ_cars = data.reduce((acc, item) => {
          if (item.Car_status && item.Car_status.toLowerCase() === "economy") {
            acc += 1;
          }
          return acc;
        }, 0); // Initial value set to 0
        setCountEconomyCars(econ_cars);
      }

      // console.log(vehicleType);
      let filteredData = vehicleType
        ? data.filter(
            (item) =>
              item.Car_status && item.Car_status.toLowerCase() === vehicleType
          )
        : data;

      // filter for price
      if (filters.price_min && filters.price_max) {
        const min_price = filters.price_min;
        const max_price = filters.price_max;
        filteredData = filteredData.filter(
          (item) =>
            item.Car_price &&
            item.Car_price >= min_price &&
            item.Car_price <= max_price
        );
      }

      // filter for brands
      if (filters.brands && filters.brands.length > 0) {
        filteredData = filteredData.filter((item) =>
          filters.brands.includes(item.Car_brand.toLowerCase())
        );
      }

      // filter for types
      if (filters.types && filters.types.length > 0) {
        filteredData = filteredData.filter((item) =>
          filters.types.includes(item.Car_type)
        );
      }

      // console.log(filteredData);
      setCarsData(filteredData);

      // get brands
      if (brands === null) {
        const car_brands = filteredData.map((item) => item.Car_brand);

        const countByBrand = Array.from(car_brands).reduce((acc, item) => {
          if (item)
            acc[item.toLowerCase()] = (acc[item.toLowerCase()] || 0) + 1;
          return acc;
        }, {});

        setBrands(countByBrand);
      }
    });
  }, [vehicleType, filters]);

  return (
    <>
      {/* filters */}
      {showFilters ? (
        <>
          <div className="fixed top-0 w-screen h-screen bg-black opacity-30 z-50"></div>
          <div
            onClick={() => setShowFilters(false)}
            className="top-0 h-full z-50 fixed w-full"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="mx-auto py-10 flex flex-col items-center h-full bg-white rounded-lg lg:w-[35vw] sm:w-[75%] w-full"
            >
              <div className="w-full px-4">
                <div className="h-[80vh] overflow-y-scroll">
                  {/* price range */}
                  <div className="gap-1 flex flex-col">
                    <h1 className="text-xl font-medium">
                      {t("price_per_day")}
                    </h1>

                    <div className="w-full flex gap-4 justify-center h-[40px]">
                      <div className="flex bg-gray-200 px-2 py-1 rounded-lg items-center w-full">
                        <input
                          id="price-min"
                          placeholder={t("from")}
                          type="text"
                          className="bg-inherit focus:outline-none w-full"
                          onChange={(e) => setPriceMin(e.target.value)}
                          value={priceMin || null}
                        />
                        <p className="">{t("aed")}</p>
                      </div>

                      <div className="flex bg-gray-200 px-2 py-1 rounded-lg items-center w-full">
                        <input
                          id="price-max"
                          placeholder={t("to")}
                          type="text"
                          className="bg-inherit focus:outline-none w-full"
                          onChange={(e) => setPriceMax(e.target.value)}
                          value={priceMax || ""}
                        />
                        <p className="">{t("aed")}</p>
                      </div>
                    </div>
                  </div>

                  {/* spacer */}
                  <div className="w-[90%] h-[2px] bg-gray-200 my-8 mx-auto"></div>

                  {/* class */}
                  <h1 className="text-xl font-medium">{t("class")}</h1>
                  <ul className="text-lg ">
                    <div className="flex gap-2 hover:text-red-300 hover:cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() => selectCarType("luxury")}
                        checked={vehicleType === "luxury"}
                        className=""
                      ></input>
                      <p className="">{t("luxury")}</p>
                    </div>
                    <div className="flex gap-2 hover:text-red-300 hover:cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() => selectCarType("economy")}
                        checked={vehicleType === "economy"}
                        className=""
                      ></input>
                      <p className="">{t("economy")}</p>
                    </div>
                  </ul>

                  {/* spacer */}
                  <div className="w-[90%] h-[2px] bg-gray-200 my-8 mx-auto"></div>

                  {/* brand */}
                  <h1 className="text-xl font-medium">{t("brand")}</h1>
                  <ul className="text-lg ">
                    {Object.entries(brands).map(([brandName, numberOfVehc]) => (
                      <div key={brandName} className="flex gap-2">
                        <input
                          type="checkbox"
                          className=""
                          onChange={() => toggleBrandFilter(brandName)}
                          checked={
                            filters.brands && filters.brands.includes(brandName)
                          }
                        ></input>
                        <p
                          className=" hover:text-red-500 hover:cursor-pointer"
                          onClick={() => toggleBrandFilter(brandName)}
                        >
                          {`${brandName[0].toUpperCase()}${brandName.substring(
                            1
                          )} (${numberOfVehc})`}
                        </p>
                      </div>
                    ))}
                  </ul>

                  {/* spacer */}
                  <div className="w-[90%] h-[2px] bg-gray-200 my-8 mx-auto"></div>

                  {/* type */}
                  <h1 className="text-xl font-medium">{t("car_type")}</h1>
                  <ul className="text-lg ">
                    {carTypes.map((carType, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="checkbox"
                          className=""
                          onChange={() => toggleTypeFilter(carType)}
                          checked={
                            filters.types && filters.types.includes(carType)
                          }
                        ></input>
                        <p
                          className=" hover:text-red-500 hover:cursor-pointer"
                          onClick={() => toggleTypeFilter(carType)}
                        >
                          {t(carType.toLowerCase())}
                        </p>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex w-full h-full items-center justify-center">
                <button
                  onClick={() => {
                    setShowFilters(false);
                    applyFilters();
                  }}
                  className="text-lg font-medium bg-red-500 text-white hover:bg-red-200 hover:text-black outline outline-red-500 w-[80%] py-2 rounded-lg"
                >
                  {t("done")}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* hero */}
      <div id="navigation" className="relative w-full h-screen">
        {/* logo for mobile + tab */}
        <Link
          to={"/"}
          className="lg:hidden absolute top-0 w-full bg-black/50 z-10"
        >
          <img
            src={logo}
            width="175"
            alt=""
            className="w-[150px] mx-auto my-4"
          />
        </Link>

        {/* language for mobile + tab */}
        <div className={`absolute right-0 top-0 p-6 lg:hidden z-10 text-white`}>
          {i18n.language === "ar" ? (
            <button
              className="hover:text-red-500 h-full"
              onClick={() => changeLanguage("en")}
            >
              English
            </button>
          ) : (
            <button
              className="hover:text-red-500 h-full"
              onClick={() => changeLanguage("ar")}
            >
              العربية
            </button>
          )}
        </div>

        {/* navigation bar for desktop */}
        <div
          className={`lg:flex hidden justify-center py-8 px-16 top-0 fixed items-center w-full z-10 ${
            scroll > 0 ? "bg-white shadow-xl" : "bg-black/50"
          }`}
        >
          <Link to={"/"}>
            <img
              src={logo}
              width="175"
              alt=""
              className="fixed left-20 top-5"
            />
          </Link>
          <ul
            className={`flex gap-12 text-lg font-normal max-auto ${
              scroll > 0 ? "text-black" : "text-white"
            }`}
          >
            <li>
              <Link className="hover:text-red-600" to="/#navigation">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-600" to="/about#navigation">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-600" to="/about#faqs">
                {t("FAQs")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-600" to="/#vehicles">
                {t("vehicles")}
              </Link>
            </li>
          </ul>

          <div
            className={`fixed right-20 flex gap-4 ${
              i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div className="outline outline-2 text-white bg-red-500/80 rounded-lg hover:bg-red-500 px-4 hover:cursor-pointer">
              <button
                onClick={() => {
                  document
                    .getElementById("vehicles")
                    .scrollIntoView({ behavior: "smooth" });
                  setShowFilters(true);
                }}
                className="text-ingerit px-4 py-2 focus:outline-none hover:cursor-pointer"
              >
                {t("filters")}
              </button>
            </div>
            <div className={`${scroll > 0 ? "text-black" : "text-white"}`}>
              {i18n.language === "ar" ? (
                <button
                  className="hover:text-red-500 h-full"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
              ) : (
                <button
                  className="hover:text-red-500 h-full"
                  onClick={() => changeLanguage("ar")}
                >
                  العربية
                </button>
              )}
            </div>
          </div>
        </div>

        {/* hamburger menu mobile + tab */}
        <HamburgerMenu />

        <WhatsAppButton />

        <video
          autoPlay
          muted
          loop
          playsInline
          className="min-w-full min-h-full object-cover -z-10"
        >
          <source src={HeroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute top-[20%] w-full flex items-center justify-center">
          <p className="text-6xl font-medium text-white text-center">
            {t("find_your")}
            <span className="text-red-700 text-6xl font-bold mx-3">
              {t("perfect_ride")}
            </span>
            {t("in_dubai")}
          </p>
        </div>
      </div>

      {/* select car type */}
      <div className="flex flex-col gap-12 w-full mt-20">
        <div className="flex rounded-lg h-20 bg-red-500/80 mx-12 justify-center items-center">
          <p className="lg:text-3xl text-xl font-semibold text-gray-100 animate-pulse text-center">
            {t("sale4")}
          </p>
        </div>

        <div className="sm:flex gap-12 px-12 items-center justify-center hidden lg:my-12">
          <div
            onClick={() => selectCarType("luxury")}
            className={
              vehicleType === "luxury"
                ? "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black outline outline-6 shadow-xl gap-1 hover:cursor-pointer transform transition-transform duration-300 hover:scale-110"
                : "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black shadow-xl gap-1 hover:cursor-pointer transform transition-transform duration-300 hover:scale-110"
            }
          >
            <img src={LuxuryCar} className="w-full h-auto" alt="" />
            <p className="text-3xl font-medium">{t("luxury")}</p>
            {/* {countLuxuryCars !== null ? (
              <p className="text-2xl">{countLuxuryCars} cars available</p>
            ) : (
              <div className="my-2 rounded-xl w-[50%] h-6 animate-pulse bg-gray-300"></div>
            )} */}
          </div>

          <div
            onClick={() => selectCarType("economy")}
            className={
              vehicleType === "economy"
                ? "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black outline outline-6 shadow-xl gap-1 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                : "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black shadow-xl gap-1 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            }
          >
            <img src={EconomyCar} className="w-full h-auto" alt="" />
            <p className="text-3xl font-medium">{t("economy")}</p>
            {/* {countEconomyCars !== null ? (
              <p className="text-2xl">{countEconomyCars} cars available</p>
            ) : (
              <div className="my-2 rounded-xl w-[50%] h-6 animate-pulse bg-gray-300"></div>
            )} */}
          </div>
        </div>

        <div className="flex justify-center gap-4 px-12 sm:hidden">
          <div
            onClick={() => selectCarType("luxury")}
            className={
              vehicleType === "luxury"
                ? "flex py-2 justify-center items-center w-full rounded-lg outline bg-red-500 text-white hover:bg-red-400 hover:outline-red-400"
                : "flex py-2 justify-center items-center w-full rounded-lg outline hover:bg-red-400 hover:outline-red-400"
            }
          >
            <p className="font-medium">{t("luxury")}</p>
          </div>
          <div
            onClick={() => selectCarType("economy")}
            className={
              vehicleType === "economy"
                ? "flex py-2 justify-center items-center w-full rounded-lg outline bg-red-500 hover:bg-red-400 hover:outline-red-400"
                : "flex py-2 justify-center items-center w-full rounded-lg outline hover:bg-red-400 hover:outline-red-400"
            }
          >
            <p className="font-medium">{t("economy")}</p>
          </div>
        </div>
      </div>

      {/* grid of cars available + filters */}
      <div id="vehicles" className="w-full px-12 my-12">
        {/* filters */}
        <div className="sm:flex gap-4 grid grid-cols-1">
          <button
            onClick={() => {
              setShowFilters(true);
            }}
            className="bg-red-500/80 text-white px-4 rounded-xl text-lg font-medium outline hover:bg-red-500 py-1 flex gap-2 sm:w-fit"
          >
            <img src={iconFilter} alt="" width={20} />
            <p className="">{t("filters")}</p>
          </button>

          {filters.price_min ? (
            <>
              <div
                onClick={removePriceFilter}
                className="px-4 py-2 flex gap-4 outline outline-1 rounded-xl hover:bg-red-200 hover:cursor-pointer"
              >
                <p>
                  AED {filters.price_min}-{filters.price_max}
                </p>
                <img src="images/xmark-solid.svg" width={15} alt="" />
              </div>
            </>
          ) : (
            <></>
          )}

          {filters.brands ? (
            filters.brands.map((brandName, index) => (
              <div
                key={index}
                onClick={() => toggleBrandFilter(brandName)}
                className="px-4 py-2 flex justify-between gap-4 outline outline-1 rounded-xl hover:bg-red-200 hover:cursor-pointer"
              >
                <p className="w-fit">{`${brandName[0].toUpperCase()}${brandName.substring(
                  1
                )}`}</p>
                <img src="images/xmark-solid.svg" width={15} alt="" />
              </div>
            ))
          ) : (
            <></>
          )}

          {filters.types ? (
            filters.types.map((carType, index) => (
              <div
                key={index}
                onClick={() => toggleTypeFilter(carType)}
                className="px-4 py-2 flex justify-between gap-4 outline outline-1 rounded-xl hover:bg-red-200 hover:cursor-pointer"
              >
                <p className="w-fit">{t(carType.toLowerCase())}</p>
                <img src="images/xmark-solid.svg" width={15} alt="" />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        {/* available cars */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full my-20 gap-12">
          {carsData
            ? Array.from(carsData).map((item, index) => (
                <VehicleListingCard item={item} />
              ))
            : Array(6)
                .fill(0)
                .map((item, index) => (
                  <div
                    key={index}
                    className="animate-pulse justify-center flex flex-col col-span-1 rounded-3xl p-8 bg-white shadow-xl gap-2"
                  >
                    <div className="w-full h-[300px]">
                      <div className="h-[250px] w-full bg-gray-300 rounded-2xl"></div>
                    </div>
                    <div className="h-4 w-[80%] bg-gray-300 rounded-xl"></div>
                    <div className="h-4 w-[50%] bg-gray-300 rounded-xl"></div>
                  </div>
                ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
