import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import FAQsCard from "../Components/FAQsCard";
import { useNavigate, Link, useLocation } from "react-router-dom";
import logo from "/src/assets/images/logo.png";
import HamburgerMenu from "../Components/HamburgerMenu";
import WhatsAppButton from "../Components/WhatsAppButton";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../utils";

const About = () => {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const [scroll, setScroll] = useState(0);
  const { t, i18n } = useTranslation();
  const faqItems = t("faqs_items.items", { returnObjects: true });
  document.dir = i18n.language === "ar" ? "rtl" : "ltr";

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

      {/* <Link to={"/"}>
        <img
          src={logo}
          width="175"
          alt=""
          className="lg:hidden mx-auto sm:w-[150px] w-[100px] my-4"
        />
      </Link> */}

      {/* navigation bar */}
      <div id="navigation" className="relative">
        <Link to={"/"}>
          <img
            src={logo}
            width="175"
            alt=""
            className="lg:hidden mx-auto sm:w-[150px] w-[100px] my-4"
          />
        </Link>

        {/* navigation bar */}
        <div
          className={`lg:flex hidden justify-center py-8 px-16 top-0 fixed items-center w-full z-10 ${
            scroll > 0 ? "bg-white shadow-xl" : "bg-none"
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
            className={`flex gap-12 text-lg font-medium max-auto ${
              scroll > 0 ? "text-black" : "text-black"
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

          <div className={`fixed right-20 flex gap-4`}>
            <div>
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

        <div className="absolute top-0 right-0 px-8 py-4 lg:hidden">
              {i18n.language === "ar" ? (
                <button className="hover:text-red-500 h-full" onClick={() => changeLanguage("en")}>English</button>
              ) : (
                <button className="hover:text-red-500 h-full" onClick={() => changeLanguage("ar")}>العربية</button>
              )}
      </div>

        {/* hamburger menu */}
        <HamburgerMenu />

        <WhatsAppButton />

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

      {/* hamburger menu */}
      <HamburgerMenu />

      {/* Whatsapp button */}
      <WhatsAppButton />

      <div className="flex lg:flex-row sm:flex-col flex-col-reverse text-black lg:mt-40 sm:mt-20 mt-12 w-full">
        <div className="flex flex-col w-full gap-8 px-6 sm:px-12">
          <h1 className="text-5xl font-bold ">{t("about_us")}</h1>
          <p className="text-lg text-gray-700 font-medium">
            {t("about_us_text_1")}
          </p>

          <p className="text-gray-700">{t("about_us_text_2")}</p>

          <div className="px-4 border-left border-l-4 border-l-red-400">
            <p className="sm:w-[70%] w-full text-gray-700 font-medium text-lg">
              {t("about_us_text_3")}
            </p>
          </div>

          <p className="text-gray-700">{t("about_us_text_4")}</p>
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
            <h3 className="text-4xl font-bold ">{t("client_section_title")}</h3>
            <p className="text-red-500 text-3xl font-extrabold">"</p>
            <p className=" text-gray-700 italic w-full text-center">
              {t("client_feedback")}
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
          <span className="text-3xl font-bold px-4 w-[200px] text-center">
            {t("years_in_business")}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 justify-between lg:border-l max-sm:border-t border-t-gray-700 lg:border-l-gray-700 px-12 pt-8">
          <div className="flex flex-col gap-4 justify-center items-center w-full">
            <p className="text-5xl font-extrabold">2,000+</p>
            <p className="text-red-500 text-xl">{t("customers")}</p>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-5xl font-extrabold">4,500+</p>
            <p className="text-red-500 text-xl">{t("cars_rented")}</p>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="text-5xl font-extrabold">≈100</p>
            <p className="text-red-500 text-xl">{t("cars")}</p>
          </div>
        </div>
      </div>

      <div
        id="faqs"
        className="flex flex-col my-20 lg:mx-20 sm:mx-12 mx-2 bg-gray-300 rounded-3xl lg:px-20 sm:px-12 px-4 py-6 gap-4"
      >
        <h1 className="sm:text-5xl text-4xl font-bold w-full text-center my-8">
          {t("faqs_items.title")}
        </h1>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 lg:px-8">
          <div className="flex flex-col gap-4 w-full mx-auto">
            {faqItems.slice(0, 4).map((item, idx) => (
              <FAQsCard
                key={idx}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 w-full mx-auto">
            {faqItems.slice(4).map((item, idx) => (
              <FAQsCard
                key={idx + 4}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="hover:bg-red-400 w-fit rounded-lg p-4 mx-auto my-8 bg-red-500 text-white text-lg font-medium"
        >
          {t("faqs_items.learnMore")}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default About;
