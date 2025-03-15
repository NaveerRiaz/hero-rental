import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import Footer from "../Components/Footer";
import { useNavigate, Link, useLocation } from "react-router-dom";
import db from "../firebase";
import LuxuryCar from "/src/assets/images/hero-image-merc.png";
import EconomyCar from "/src/assets/images/economy.webp";
import logo from "/src/assets/images/logo.png";
import iconFilter from "/public/images/sliders-solid.svg"
import HamburgerMenu from "../Components/HamburgerMenu";
import VehicleListingCard from "../Components/VehicleListingCard";

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
  const [scroll, setScroll] = useState(0);
  const { hash } = useLocation();

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

  const navigate = useNavigate();

  const applyFilters = () => {
    // console.log(filts);

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

  useEffect(() => {
    getData(db).then((data) => {
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
                    <h1 className="text-xl font-medium">Price per day</h1>

                    <div className="w-full flex gap-4 justify-center h-[40px]">
                      <div className="flex bg-gray-200 px-2 py-1 rounded-lg items-center w-full">
                        <input
                          id="price-min"
                          placeholder="From"
                          type="text"
                          className="bg-inherit focus:outline-none w-full"
                          onChange={(e)=>setPriceMin(e.target.value)}
                          value={priceMin || null}
                        />
                        <p className="">AED</p>
                      </div>

                      <div className="flex bg-gray-200 px-2 py-1 rounded-lg items-center w-full">
                        <input
                          id="price-max"
                          placeholder="To"
                          type="text"
                          className="bg-inherit focus:outline-none w-full"
                          onChange={(e)=>setPriceMax(e.target.value)}
                          value={priceMax || ""}
                        />
                        <p className="">AED</p>
                      </div>
                    </div>
                  </div>

                  {/* spacer */}
                  <div className="w-[90%] h-[2px] bg-gray-200 my-8 mx-auto"></div>

                  {/* class */}
                  <h1 className="text-xl font-medium">Class</h1>
                  <ul className="text-lg ">
                    <div className="flex gap-2 hover:text-red-300 hover:cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() => selectCarType("luxury")}
                        checked={vehicleType === "luxury"}
                        className=""
                      ></input>
                      <p className="">Luxury</p>
                    </div>
                    <div className="flex gap-2 hover:text-red-300 hover:cursor-pointer">
                      <input
                        type="checkbox"
                        onChange={() => selectCarType("economy")}
                        checked={vehicleType === "economy"}
                        className=""
                      ></input>
                      <p className="">Economy</p>
                    </div>
                  </ul>

                  {/* spacer */}
                  <div className="w-[90%] h-[2px] bg-gray-200 my-8 mx-auto"></div>

                  {/* brand */}
                  <h1 className="text-xl font-medium">Brand</h1>
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
                  Done
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* hero */}
      <div id="navigation" className="relative w-full">

      <Link to={"/"}>
        <img src={logo} width="175" alt="" className="lg:hidden mx-auto sm:w-[150px] w-[100px] my-4"/>
      </Link>

        {/* navigation bar */}
        <div
          className={`lg:flex hidden justify-center py-8 px-16 top-0 fixed items-center w-full z-10 ${
            scroll > 0 ? "bg-white shadow-xl" : "bg-none"
          }`}
        >
          <img src={logo} width="175" alt="" className="fixed left-20"/>

          <ul
            className={`flex gap-12 text-lg font-medium max-auto ${
              scroll > 0 ? "text-black" : "text-black"
            }`}
          >
            <li>
              <Link className="hover:text-red-600" to="/#navigation">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-600" to="/about#navigation">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-600" to="/about#faqs">
                FAQs
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-600" to="/#vehicles">
                Vehicles
              </Link>
            </li>
          </ul>

          <div className="fixed right-20 outline outline-2 text-white bg-red-500/80 outline-red-500/80 rounded-lg hover:bg-red-500 px-4 hover:cursor-pointer">
            <button
              onClick={() => {
                document
                  .getElementById("vehicles")
                  .scrollIntoView({ behavior: "smooth" });
                setShowFilters(true);
              }}
              className="text-ingerit px-4 py-2 focus:outline-none hover:cursor-pointer"
            >
              Filters
            </button>
          </div>
        </div>

        {/* hamburger menu */}
        <HamburgerMenu />

        {/* Whatsapp button */}
        <div className="flex gap-2 items-center fixed bottom-10 right-10 z-20 sm:bg-white sm:rounded-3xl sm:px-6 sm:py-2 sm:shadow-xl">
          <p className="text-xl max-sm:hidden">How can we help you?</p>
          <a href="https://wa.me/971561382222" className="">
            <img
              src="https://img.icons8.com/color/48/000000/whatsapp.png"
              alt=""
              width="75"
            />
          </a>
        </div>

        {/* <img
          className="w-full top-0 absolute -z-10 opacity h-screen object-cover"
          src={HeroImage}
          alt=""
        /> */}

        {/* <div className="absolute top-[10%] w-full flex items-center justify-center">
          <p className="text-6xl font-medium text-black text-center">Find Your
          <span className="text-red-700 text-6xl font-bold mx-3">
            Perfect Ride
          </span>
          in Dubai</p>
        </div> */}
      </div>

      {/* select car type */}
      <div className="flex flex-col gap-12 w-full mt-20">

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
            <p className="text-3xl font-medium">Luxury</p>
            <p className="text-2xl">150+ cars available</p>
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
            <p className="text-3xl font-medium">Economy</p>
            <p className="text-2xl">250+ cars available</p>
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
            <p className="font-medium">Luxury</p>
          </div>
          <div
            onClick={() => selectCarType("economy")}
            className={
              vehicleType === "economy"
                ? "flex py-2 justify-center items-center w-full rounded-lg outline bg-red-500 hover:bg-red-400 hover:outline-red-400"
                : "flex py-2 justify-center items-center w-full rounded-lg outline hover:bg-red-400 hover:outline-red-400"
            }
          >
            <p className="font-medium">Economy</p>
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
            className="bg-red-500/80 text-white px-4 rounded-xl text-lg font-medium outline outline-red-500/80 hover:text-black hover:bg-red-500 py-1 flex gap-2 sm:w-fit"
          >
            <img src={iconFilter} alt="" width={20}/>
            <p className="">Filters</p>
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
