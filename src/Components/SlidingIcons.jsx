import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://via.placeholder.com/300x200",
  "https://via.placeholder.com/300x200/ff7f7f",
  "https://via.placeholder.com/300x200/77ff77",
  "https://via.placeholder.com/300x200/7777ff",
  "https://via.placeholder.com/300x200/ffff77",
  "https://via.placeholder.com/300x200/77ffff",
];

const SlidingIcons = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black">
      <motion.div
        className="flex"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ ease: "linear", duration: 10, repeat: Infinity }}
      >
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Sliding Image ${index}`}
            className="w-72 h-48 object-cover mx-2"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SlidingImages;
