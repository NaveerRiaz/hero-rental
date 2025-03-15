import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import db from "../firebase";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "/src/assets/images/logo.png";
import Footer from "../Components/Footer";
import HamburgerMenu from "../Components/HamburgerMenu";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import WhatsAppButton from "../Components/WhatsAppButton";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";

const accountSid = import.meta.env.VITE_ACCOUNT_SID;
const authToken = import.meta.env.VITE_AUTH_TOKEN;

const Details = () => {
  const [scroll, setScroll] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const notifySuccess = () =>
    toast.success(
      "Thank you for submitting an enquiry. We will contact you soon",
      {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );
  const notifyError = () =>
    toast.error(
      "Something went wrong! Please contact us on whatsapp, phone or email.",
      {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      }
    );

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScroll(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { id } = useParams(); // Get document ID from URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!id) return; // Prevent execution if no ID is provided

    const element = document.getElementById("navigation");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const fetchCar = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "Cars", id); // Reference specific document
        const docSnap = await getDoc(docRef); // Fetch document

        setCar(docSnap.data()); // Store document data
      } catch (error) {
        console.error("Error fetching document:", error);
      }
      setLoading(false);
    };

    fetchCar();
  }, [id]);

  const sendWhatsAppMessage = async (name, phone, date_from, date_to) => {
    setProcessing(true);
    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    const data = new URLSearchParams();
    data.append("To", `whatsapp:${import.meta.env.VITE_RECV_PHONE_NUMBER}`);
    data.append("From", `whatsapp:${import.meta.env.VITE_SEND_PHONE_NUMBER}`);
    data.append("ContentSid", import.meta.env.VITE_WHATSAPP_TEMPLATE_SID);
    data.append(
      "ContentVariables",
      JSON.stringify({
        car_name: car.Car_name,
        car_brand: car.Car_brand,
        car_type: car.Car_type,
        car_price: car.Car_price ? car.Car_price : "Contact for a price",
        start_date: date_from,
        end_date: date_to,
        customer_name: name,
        customer_email: "example@email.com",
        customer_phone: phone,
      })
    );

    try {
      const response = await axios.post(url, data, {
        auth: {
          username: accountSid,
          password: authToken,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(accountSid + ":" + authToken),
        },
      });

      // console.log("Message Sent:", response.data);
      setProcessing(false);
      notifySuccess();
    } catch (error) {
      // console.error(
      //   "Error sending message:",
      //   error.response?.data || error.message
      // );
      setProcessing(false);
      notifyError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const date_to = endDate ? format(endDate, "dd-MM-yyyy") : null;
    const date_from = startDate ? format(startDate, "dd-MM-yyyy") : null;

    if (!name || !phone || !date_from || !date_to) {
      alert("Please fill in all fields");
      return;
    }

    await sendWhatsAppMessage(name, phone, date_from, date_to);
    e.target.reset();
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <>
      <div id="navigation"></div>

      <div className="relative w-full lg:h-screen">
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
            <img src={logo} width="175" alt="" className="fixed left-20" />
          </Link>

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
        </div>
        {/* hamburger menu */}
        <HamburgerMenu />

        {/* Whatsapp button */}
        <WhatsAppButton />

        {car ? (
          <>
            <div className="flex px-20 gap-4 py-4 relative max-lg:hidden lg:mt-24">
              <a href="/" className="text-gray-600 text-lg hover:text-black">
                Home
              </a>
              <p className="text-gray text-lg">-</p>
              <a href="/" className="text-gray-600 text-lg hover:text-black">
                {car.Car_status}
              </a>
              <p className="text-gray text-lg">-</p>
              <a href="/" className="text-gray-600 text-lg hover:text-black">
                {car.Car_brand}
              </a>
            </div>

            <div className="flex px-20 gap-4 max-lg:flex-col max-lg:px-4 max-lg:my-20">
              <div className="flex flex-col lg:hidden">
                <h1 className="text-3xl font-medium">{car.Car_name}</h1>
                <div className="flex gap-2 items-center">
                  <p className="text-lg">{car.Car_model}</p>
                  <p className="text-lg">{car.Car_type}</p>
                </div>

                <p className="text-2xl font-bold text-red-500">
                  {car.Car_price
                    ? `AED ${car.Car_price} per day`
                    : "Contact for a price"}
                </p>
              </div>

              <div className="flex gap-2 h-[500px] w-[60%] max-lg:w-full max-lg:flex-col-reverse max-lg:h-auto">
                <div className="flex flex-col w-[10%] h-[500px] overflow-y-scroll scrollbar-none max-lg:flex-row max-lg:w-full max-lg:h-[100px] gap-2">
                  {Array.from(car.Car_image).map((item, index) => (
                    <img
                      key={index}
                      onClick={() => setPrimaryImage(item)}
                      src={item}
                      alt=""
                      className="rounded-xl my-2 opacity-75 hover:opacity-100 hover:cursor-pointer"
                    />
                  ))}
                </div>

                <div className="h-full mx-auto">
                  <img
                    className="rounded-2xl w-full h-full object-contain"
                    src={primaryImage ? primaryImage : car.Car_image[0]}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 max-lg:hidden">
                  <h1 className="text-3xl font-medium">{car.Car_name}</h1>
                  <div className="flex gap-2 items-center">
                    <p className="text-lg">{car.Car_model}</p>
                    <p className="text-lg">{car.Car_type}</p>
                  </div>

                  <p className="text-2xl font-bold text-red-500">
                    {car.Car_price
                      ? `AED ${car.Car_price} per day`
                      : "Contact for a price"}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between gap-2 my-2 max-lg:flex-col">
                    <div className="flex flex-col w-full">
                      <p className="font-medium">Name*</p>
                      <input
                        id="name"
                        required
                        className="rounded-lg px-2 py-1"
                        type="text"
                        placeholder="Name"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="font-medium">Phone Number*</p>
                      <input
                        id="phone"
                        required
                        className="rounded-lg px-2 py-1"
                        type="number"
                        placeholder="+971"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between gap-2 max-lg:flex-col">
                    <div className="flex flex-col w-full">
                      <p className="font-medium">Date From*</p>
                      <DatePicker
                        selected={startDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        onChange={(date) => setStartDate(date)}
                        className="rounded-lg px-2 py-1 w-full"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="font-medium">Date To*</p>
                      <DatePicker
                        selected={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="DD/MM/YYYY"
                        onChange={(date) => setEndDate(date)}
                        className="rounded-lg px-2 py-1 w-full"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-red-500 text-white w-full rounded-lg py-1 my-4"
                    disabled={processing}
                  >
                    {processing ? (
                      <p className="animate-pulse">Please wait...</p>
                    ) : (
                      "Send enquiry"
                    )}
                  </button>
                </form>

                <div className="bg-gray-300 w-full rounded-xl p-4 flex flex-col gap-1">
                  <div className="flex">
                    <span className="font-medium">Make:</span>
                    <span className="px-2">{car.Car_brand}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium">Year:</span>
                    <span className="px-2">{car.Car_model}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium">Colour:</span>
                    <span className="px-2">{car.Car_colour}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium">Type:</span>
                    <span className="px-2">{car.Car_type}</span>
                  </div>
                  <div className="flex">
                    <span className="font-medium">Doors:</span>
                    <span className="px-2">{car.Car_seats}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full h-screen items-center justify-center">
            <p className="text-3xl font-medium">Loading...</p>
          </div>
        )}
      </div>

      <div className="fixed top-0 right-0">
        <ToastContainer />
      </div>
      {car && <Footer />}
    </>
  );
};

export default Details;
