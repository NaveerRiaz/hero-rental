import React from "react";
import { useNavigate } from "react-router-dom";
import {formatCurrency, formatNumber} from "../utils";
import { useTranslation } from "react-i18next";

const VehicleListingCard = ({ item }) => {

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/details/${item.id}`)}
      className="flex flex-col col-span-1 rounded-3xl bg-white shadow-xl gap-1 pb-4 hover:outline hover:outline-primary-500 hover:cursor-pointer"
    >
      <div className="w-full h-[300px] relative">
        <img
          src={
            item.Car_image
              ? item.Car_image[0]
              : "https://placehold.co/600x400?text=No-Image"
          }
          className="w-full h-full object-cover rounded-3xl"
          alt=""
        />

        {item.Car_model && (
          <div className="bg-primary-500/80 absolute top-5 left-5 rounded-xl px-3 py-2">
            <p className="font-medium text-3xl text-white">{formatNumber(item.Car_model, i18n.language)}</p>
          </div>
        )}
      </div>
      <div className="py-4 px-6">
        <p className="text-3xl font-medium">{i18n.language == "ar" ? item.Arabic_name : item.Car_name}</p>
        <p className="text-2xl w-full text-primary-500 font-medium">
          {item.Car_price ? `${formatCurrency(item.Car_price, i18n.language)} ${t("per_day")}` : "Call to confirm"}
        </p>
        {/* <p className="text-2xl text-gray-500">
          {item.Car_seats ? `${formatNumber(item.Car_seats.split(" ")[0], i18n.language)} ${t("doors")}` : ""}{" "}
        </p> */}
        <p className="text-2xl text-gray-500">
          {item.Car_type ? t(item.Car_type.toLowerCase()): ""}{" "}
        </p>
      </div>
    </div>
  );
};

export default VehicleListingCard;
