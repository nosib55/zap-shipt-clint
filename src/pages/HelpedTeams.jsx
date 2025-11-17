import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

import casio from "../assets/brands/casio.png";
import amazon from "../assets/brands/amazon.png";
import moonstar from "../assets/brands/moonstar.png";
import starplus from "../assets/brands/star.png";
import startpeople from "../assets/brands/start_people.png";
import randstad from "../assets/brands/randstad.png";

const HelpedTeams = () => {
  const logos = [casio, amazon, moonstar, starplus, startpeople, randstad];

  return (
    <div className="bg-[#E7ECEF] mt-5 rounded-2xl py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h3 className="text-center text-[#003F3F] font-semibold mb-6">
          We've helped thousands of sales teams
        </h3>

        {/* Swiper Logo Slider */}
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <img
                src={logo}
                alt="brand"
                className="h-10 object-contain opacity-80 hover:opacity-100 transition duration-200 cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HelpedTeams;
