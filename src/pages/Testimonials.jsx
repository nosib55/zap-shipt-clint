import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import TopImage from "../assets/banner/customer-top.png";

export default function Testimonials3DFixed() {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const reviews = [
    {
      review: "Super fast delivery — arrived earlier than promised and the driver was polite.",
      userName: "Aarav Sharma",
      role: "E-commerce Seller",
      user_photoURL: "https://i.pravatar.cc/150?img=12",
    },
    {
      review: "Live tracking was spot on. Made it easy to manage pickups for my store.",
      userName: "Sarah Thompson",
      role: "Small Business Owner",
      user_photoURL: "/images/avatar2.jpg",
    },
    {
      review: "Fragile items arrived intact. Packaging and handling were excellent.",
      userName: "Mohammed Ali",
      role: "Online Store Manager",
      user_photoURL: "/images/avatar3.jpg",
    },
    {
      review: "Customer support re-routed my parcel when I missed delivery — superb service!",
      userName: "Emily Brown",
      role: "Digital Marketer",
      user_photoURL:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300",
    },
    {
      review: "Fast, affordable and reliable — we ship our stock with them every week.",
      userName: "Jacob Martinez",
      role: "Business Owner",
      user_photoURL:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 text-center">
      <img src={TopImage} alt="top" className="w-44 mx-auto mb-6" />

      <h2 className="text-3xl font-extrabold text-[#023737] mb-2">
        What our customers are saying
      </h2>
      <p className="text-sm text-slate-500 max-w-2xl mx-auto mb-8">
        Fast • Safe • Reliable — real feedback from people who ship with us daily.
      </p>

      <div className="relative overflow-hidden px-6">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow hover:scale-105 transition"
        >
          ‹
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow hover:scale-105 transition"
        >
          ›
        </button>

        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          modules={[Navigation, Autoplay, EffectCoverflow]}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          effect="coverflow"
          coverflowEffect={{ rotate: 18, stretch: 0, depth: 160, modifier: 1, slideShadows: true }}
          spaceBetween={24}
          slidesPerView={3}
          breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 1 }, 768: { slidesPerView: 3 } }}
          onSlideChange={(s) => setCurrent(s.realIndex ?? s.activeIndex)}
          className="py-6"
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              <article
                className={`w-full max-w-sm bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-all duration-300 transform-gpu ${
                  current === i ? "opacity-100 scale-100" : "opacity-30 scale-95"
                }`}
              >
                <FaQuoteLeft className="text-emerald-600 text-2xl mb-4" />

                <p className="text-slate-700 text-sm mb-4 text-left leading-relaxed">
                  {r.review}
                </p>

                <div className="border-t border-dashed border-gray-300 my-4" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-100">
                    <img src={r.user_photoURL} alt={r.userName} className="w-full h-full object-cover" />
                  </div>

                  <div className="text-left">
                    <h3 className="font-semibold text-lg text-[#023737]">{r.userName}</h3>
                    <p className="text-sm text-gray-500">{r.role}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`w-3 h-3 rounded-full transition ${
              current === i ? "bg-emerald-600" : "bg-slate-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
