import React from "react";
import { useNavigate } from "react-router-dom";

const VehicleListingCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/details/${item.id}`)}
      className="flex flex-col col-span-1 rounded-3xl bg-white shadow-xl gap-1 pb-4 hover:outline hover:outline-red-500 hover:cursor-pointer"
    >
      <div className="w-full h-[300px]">
        <img
          src={
            item.Car_image
              ? item.Car_image[0]
              : "https://placehold.co/600x400?text=No-Image"
          }
          className="w-full h-full object-cover rounded-3xl"
          alt=""
        />
      </div>
      <div className="py-4 px-6">
        <p className="text-3xl font-medium w-full">{item.Car_name}</p>
        <p className="text-2xl w-full text-red-500 font-medium">
          {item.Car_price ? `AED ${item.Car_price}` : "Call to confirm"}
        </p>
        <p className="text-2xl text-gray-500">
          {item.Car_seats ? `${item.Car_seats.split(" ")[0]} Doors` : ""}{" "}
        </p>
      </div>
    </div>
  );
};

export default VehicleListingCard;
