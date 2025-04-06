import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [t, i18n] = useTranslation();

  return (
    <>
      {/* Hamburger Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-40 p-2 rounded-md bg-red-500/80 text-white lg:hidden"
      >
        {/* Hamburger Icon (SVG) */}
        <svg className="w-8 h-8" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 6h18M3 12h18M3 18h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[50vw] bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-md text-red-500"
        >
          {/* Close Icon (SVG) */}
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Menu Items */}
        <nav className="mt-16 px-6 space-y-4">
          <ul
            className={`flex flex-col gap-4 text-lg font-medium text-black`}
          >
            <li onClick={() => setIsOpen(false)}>
              <Link className="hover:text-red-600" to="/#navigation">
                {t("home")}
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link className="hover:text-red-600" to="/about#navigation">
                {t("about_us")}
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link className="hover:text-red-600" to="/about#faqs">
                {t("FAQs")}
              </Link>
            </li>
            <li onClick={() => setIsOpen(false)}>
              <Link className="hover:text-red-600" to="/#vehicles">
                {t("vehicles")}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full p-4 text-center text-gray-500">
          <p>{t('copyright_head')} &copy; {t('copyright_tail')}</p>
        </footer>

        

      </div>
    </>
  );
};

export default HamburgerMenu;
