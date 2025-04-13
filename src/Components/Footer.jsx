import React from "react";
import logo from "/src/assets/images/logo.png";
import logoInstagram from "/src/assets/images/instagram.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../utils";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* footer */}
      <div className="w-screen bg-black px-12 justify-between flex flex-col py-4">
        <div className="lg:grid-cols-3 grid-cols-2 gap-8 mt-8 hidden sm:grid">
          {/* logo + company description */}
          <div className="flex flex-col gap-4 col-span-1">
            <img src={logo} width={175} alt="" />
            {/* <p className="text-white lg:w-[80%]">
              At Hero Car Rental, we pride ourselves on providing top-quality
              vehicles and exceptional customer service. With a wide range of
              options to choose from, we are sure to have the perfect car to
              suit your needs. Whether you're in town for business or pleasure,
              our team is dedicated to ensuring a smooth and hassle-free rental
              experience. Trust us to get you on the road and exploring Dubai in
              style.
            </p> */}
          </div>

          {/* navigation */}
          <div className="lg:flex hidden flex-col gap-4 col-span-1 px-8 py-10">
            <ul className="text-white text-lg space-y-2">
              <li>
                <Link className="hover:text-red-600" to="/#navigation">
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link className="hover:text-red-600" to="/about#navigation">
                  {t("about_us")}
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
          </div>

          {/* social media + contact */}
          <div className="flex flex-col items-end justify-center gap-1">
            <h1 className="text-primary-500 text-3xl font-bold">
              <a href="tel:+971561382222" className={i18n.language === 'ar' ? 'flex flex-row-reverse' : 'flex'}>
                <span>+</span>
                <span>{formatNumber(971561382222, i18n.language)}</span>
              </a>
              <a href="tel:+97142992292" className={i18n.language === 'ar' ? 'flex flex-row-reverse' : 'flex'}>
              <span>+</span>
              <span>{formatNumber(97142992292, i18n.language)}</span>
              </a>
            </h1>
            <h1 className="text-white text-2xl font-medium">
              <a href="mailto:info@herocarrental.com">info@herocarrental.com</a>
            </h1>
            <h1 className="text-white text-2xl font-medium">
              <a href="https://maps.google.com/?q=Abu+Hail%2C+Dubai+UAE">
                {t("address")}
              </a>
            </h1>
            <a href="https://www.instagram.com/hero_rentcars/?utm_medium=copy_link">
              <img
                width={40}
                className="hover:opacity-50 mt-4"
                src={logoInstagram}
                alt=""
              />
            </a>
          </div>
        </div>

        {/* copyrights */}
        <div className="mx-auto mt-8">
          <p className="text-lg text-white text-center">
            {t('copyright_head')} &copy; {t('copyright_tail')}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
