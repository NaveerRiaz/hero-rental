import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const WhatsAppButton = () => {
  const { t, i18n } = useTranslation();
  return (
    <Link
      to={"https://wa.me/971501683111"}
      className={`flex gap-2 items-center fixed bottom-10 right-10 z-20 sm:bg-white sm:rounded-3xl sm:px-6 sm:py-2 sm:shadow-xl ${
        i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
      } `}
    >
      <p className="text-xl max-sm:hidden">{t("whatsapp")}</p>
      <img
        src="https://img.icons8.com/color/48/000000/whatsapp.png"
        alt=""
        width="75"
      />
    </Link>
  );
};

export default WhatsAppButton;
