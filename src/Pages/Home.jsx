import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import Footer from "../Components/Footer";
import { useNavigate, Link, useLocation } from "react-router-dom";
import db from "../firebase";
import HeroImage from "/src/assets/images/hero-image-merc.jpg";
import LuxuryCar from "/src/assets/images/hero-image-merc.png";
import EconomyCar from "/src/assets/images/economy.webp";
import logo from "/src/assets/images/logo.png";
import HamburgerMenu from "../Components/HamburgerMenu";

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
    const price_min = document.getElementById("price-min").value;
    const price_max = document.getElementById("price-max").value;
    // console.log(filts);
    setFilters((prev) => {
      return { ...prev, price_min: price_min, price_max: price_max };
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
      if (filters.price_min) {
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
              className="mx-auto py-10 flex flex-col items-center h-full bg-white rounded-lg sm:w-[35vw] w-full"
            >
              <div className="w-full px-4">
                <div className="h-[80vh] overflow-y-scroll">
                  {/* price range */}
                  <div className="gap-1 flex flex-col">
                    <h1 className="text-xl font-medium">Price per day</h1>

                    <div className="w-full flex gap-4 justify-between h-[40px]">
                      <div className="flex bg-gray-200 px-2 py-1 rounded-lg items-center">
                        <input
                          id="price-min"
                          placeholder="From"
                          type="text"
                          className="bg-inherit focus:outline-none w-full"
                        />
                        <p className="">AED</p>
                      </div>

                      <div className="flex bg-gray-200 px-2 py-1 rounded-lg items-center">
                        <input
                          id="price-max"
                          placeholder="To"
                          type="text"
                          className="bg-inherit focus:outline-none w-full"
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
      <div id="navigation" className="relative w-full h-screen">
        {/* navigation bar */}
        <div
          className={`md:flex hidden justify-between py-8 px-16 items-center top-0 fixed w-full z-10 ${
            scroll > 0 ? "bg-white shadow-xl" : "bg-none"
          }`}
        >
          <img src={logo} width="175" alt="" />

          <ul
            className={`flex gap-12 text-lg font-medium ${
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

          <div className="outline outline-2 text-white bg-black outline-red-600 rounded-lg hover:bg-red-500 hover:text-black px-4 hover:cursor-pointer">
            <button
              onClick={() => {
                document
                  .getElementById("vehicles")
                  .scrollIntoView({ behavior: "smooth" });
                setShowFilters(true);
              }}
              className=" bg-inherit text-ingerit px-4 py-2 focus:outline-none hover:cursor-pointer"
            >
              Filters
            </button>
          </div>
        </div>

        {/* hamburger menu */}
        <HamburgerMenu />

        {/* <YouTubeLoop videoId="33crJ6BiJ20" startTime={6} endTime={74} /> */}
        <img
          className="w-full top-0 absolute -z-10 opacity h-screen object-cover"
          src={HeroImage}
          alt=""
        />

        <div className="absolute top-[10%] mx-auto w-full flex md:flex-row flex-col items-center justify-center">
          <span className="text-6xl font-medium text-black">Find Your</span>
          <span className="text-red-700 text-6xl font-bold mx-3">
            Perfect Ride
          </span>
          <span className="text-6xl font-medium text-black">in Dubai</span>
        </div>
      </div>

      {/* slider for logos */}
      <div className="flex flex-col gap-12 w-full my-10">
        <h1 className="sm:text-5xl text-3xl text-center w-[80%] mx-auto font-medium">
          Choose Your Rental for This Weekend
        </h1>
      </div>

      {/* select car type */}
      <div className="flex flex-col gap-12 w-full my-20">
        <h1 className="text-4xl w-full text-center font-medium">
          Select by Car Type
        </h1>

        <div className="sm:flex gap-12 px-12 items-center justify-center hidden">
          <div
            onClick={() => selectCarType("luxury")}
            className={
              vehicleType === "luxury"
                ? "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black outline outline-6 shadow-xl gap-1 hover:scale-120"
                : "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black shadow-xl gap-1 hover:scale-120"
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
                ? "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black outline outline-6 shadow-xl gap-1"
                : "flex flex-col rounded-3xl p-8 w-[500px] bg-white text-black shadow-xl gap-1"
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
            }>
            <p className="font-medium">Economy</p>
          </div>
        </div>
      </div>

      {/* grid of cars available + filters */}
      <div id="vehicles" className="my-20 w-full px-12">
        {/* filters */}
        <div className="sm:flex gap-4 grid grid-cols-1">
          <button
            onClick={() => {
              setShowFilters(true);
            }}
            className="bg-black text-white px-4 rounded-xl text-lg font-medium outline outline-red-500 hover:text-black hover:bg-red-500 py-1"
          >
            Filters
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
        <div className="grid grid-cols-1 sm:grid-cols-3 w-full my-20 gap-12">
          {carsData
            ? Array.from(carsData).map((item, index) => (
                <div
                  onClick={() => navigate(`/details/${item.id}`)}
                  key={index}
                  className="flex flex-col col-span-1 rounded-3xl bg-white shadow-xl gap-1 pb-4"
                >
                  <div className="w-full h-[300px]">
                    <img
                      src={
                        item.Car_image
                          ? item.Car_image[0]
                          : "https://placehold.co/600x400?text=No-Image"
                      }
                      className="w-full h-full object-cover rounded-xl"
                      alt=""
                    />
                  </div>
                  <div className="py-4 px-6">
                    <p className="text-3xl font-medium w-full">
                      {item.Car_name}
                    </p>
                    <p className="text-2xl w-full">
                      {item.Car_price
                        ? `AED ${item.Car_price}`
                        : "Call to confirm"}
                    </p>
                    <p className="text-2xl text-gray-500">
                      {item.Car_seats
                        ? `${item.Car_seats.split(" ")[0]} Doors`
                        : ""}{" "}
                    </p>
                  </div>
                </div>
              ))
            : Array(6)
                .fill(0)
                .map((item, index) => (
                  <div
                    key={index}
                    className="animate-pulse justify-center flex flex-col col-span-1 rounded-3xl p-8 bg-white shadow-xl gap-2"
                  >
                    <div className="w-full h-[300px">
                      <img
                        src="https://placehold.co/600x400?text=Loading"
                        className="w-full h-full object-contain rounded-lg"
                        alt=""
                      />
                    </div>
                    <div className="h-4 w-[80%] bg-gray-300"></div>
                    <div className="h-4 w-[50%] bg-gray-300"></div>
                  </div>
                ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
