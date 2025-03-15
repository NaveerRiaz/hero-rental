import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import FAQsCard from "../Components/FAQsCard";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "/src/assets/images/logo.png";
import HamburgerMenu from "../Components/HamburgerMenu";
import WhatsAppButton from "../Components/WhatsAppButton";

const About = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [scroll, setScroll] = useState(0);
  

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [hash]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScroll(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div id="navigation"></div>

      <Link to={"/"}>
        <img src={logo} width="175" alt="" className="lg:hidden mx-auto sm:w-[150px] w-[100px] my-4"/>
      </Link>

        {/* navigation bar */}
        <div
          className={`lg:flex hidden justify-center py-8 px-16 top-0 fixed items-center w-full z-10 ${
            scroll > 0 ? "bg-white shadow-xl" : "bg-none"
          }`}
        >
          <Link to={"/"}>
            <img src={logo} width="175" alt="" className="fixed left-20" />
          </Link>

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


        </div>

      {/* hamburger menu */}
      <HamburgerMenu />

      {/* Whatsapp button */}
      <WhatsAppButton/>

      <div className="flex lg:flex-row sm:flex-col flex-col-reverse text-black lg:mt-40 sm:mt-20 mt-12 w-full">
        <div className="flex flex-col w-full gap-8 px-6 sm:px-12">
          <h1 className="text-5xl font-bold ">About Us</h1>
          <p className="text-lg text-gray-700 font-medium">
            At Hero Car Rental, we are dedicated to providing our customers with
            the best car rental experience in Dubai. With a wide range of
            vehicles to choose from, competitive prices, and exceptional
            customer service, we strive to make your rental experience as smooth
            and stress-free as possible.
          </p>

          <p className="text-gray-700">
            Our fleet of cars includes everything from economy cars to luxury
            vehicles, so whether you’re traveling for business or pleasure, we
            have the perfect car to suit your needs. We also offer a variety of
            rental options, including short-term and long-term rentals, daily,
            weekly and monthly rentals, to accommodate your specific needs.
          </p>

          <div className="px-4 border-left border-l-4 border-l-red-400">
            <p className="sm:w-[70%] w-full text-gray-700 font-medium text-lg">
              At Hero Car Rental, we understand that your time is valuable,
              that's why we offer 24/7 customer support to assist you with any
              questions or concerns you may have. Our team of experts will guide
              you through the rental process and ensure that you have a pleasant
              and enjoyable experience.
            </p>
          </div>

          <p className="text-gray-700">
            We are committed to providing our customers with the highest level
            of service and ensure that all our vehicles are well maintained and
            in excellent condition. Our goal is to make your car rental
            experience as convenient and hassle-free as possible, so you can
            focus on enjoying your trip to Dubai.
          </p>
        </div>

        <div className="sm:p-12 p-6">
          <img
            src="https://herocarrental.com/wp-content/uploads/2020/12/office.jpg"
            alt=""
            className="rounded-2xl"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 md:mx-12 mx-2 relative gap-4 my-20">
        <div className="bg-gray-300 rounded-3xl w-full flex lg:flex-row flex-col-reverse justify-center">
          <img
            width={300}
            src="https://herocarrental.com/wp-content/uploads/2020/08/module-13-removebg-preview.png"
            alt=""
            className="h-auto aspect-auto mx-auto"
          />

          <div className="mt-10 flex flex-col gap-1 w-full text-center lg:text-start lg:px-4">
            <h3 className="text-4xl font-bold ">Our client says</h3>
            <p className="text-red-500 text-3xl font-extrabold">"</p>
            <p className=" text-gray-700 italic w-full text-center">
              Rented a car for a road trip, it was perfect! Highly recommend!
            </p>
          </div>
        </div>

        <div className="w-full h-full">
          <img
            className="rounded-3xl h-full object-cover"
            src="https://herocarrental.com/wp-content/uploads/2023/01/655465665467-min-1.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-12 lg:gap-0 justify-between m-20">
        <div className="flex flex-col justify-center items-center lg:flex-row lg:px-12">
          <span className="text-5xl font-extrabold text-red-500 pl-4">10</span>
          <span className="text-3xl font-bold px-4 w-[150px] text-center">
            Years in Business
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 justify-between lg:border-l max-sm:border-t border-t-gray-700 lg:border-l-gray-700 px-12 pt-8">
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            <p className="text-5xl font-extrabold">2,000+</p>
            <p className="text-red-500 text-xl">Customers</p>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-5xl font-extrabold">4,500+</p>
            <p className="text-red-500 text-xl">Cars Rented</p>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-5xl font-extrabold">≈100</p>
            <p className="text-red-500 text-xl">Cars</p>
          </div>
        </div>
      </div>

      <div
        id="faqs"
        className="flex flex-col my-20 lg:mx-20 sm:mx-12 mx-2 bg-gray-300 rounded-3xl lg:px-20 sm:px-12 px-4 py-6 gap-4"
      >
        <h1 className="sm:text-5xl text-4xl font-bold w-full text-center my-8">
          Frequently Asked Questions
        </h1>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 lg:px-8">
          <div className="flex flex-col gap-4 w-full mx-auto">
            <FAQsCard
              question={"Do you offer any sort of warranty?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
            <FAQsCard
              question={"When should I get my oil changed?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
            <FAQsCard
              question={"How do I check my tire pressure?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
            <FAQsCard
              question={"How often should I rotate my tires?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
          </div>

          <div className="flex flex-col gap-4 w-full mx-auto">
            <FAQsCard
              question={"What is Auto Detailing?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
            <FAQsCard
              question={"Is it urgent to fix an oil leak?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
            <FAQsCard
              question={"What causes brake pulsation?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
            <FAQsCard
              question={"Why is it important to rotate tires?"}
              answer={
                "We can help with your financing plan, we can offer some tips and tricks. Drive off with this dream car of yours regardless of your credit history."
              }
            />
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="hover:bg-red-400 w-fit rounded-lg p-4 mx-auto my-8 bg-red-500 text-white text-lg font-medium"
        >
          Learn More
        </button>
      </div>

      <Footer />
    </>
  );
};

export default About;
