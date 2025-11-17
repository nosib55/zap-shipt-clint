// Testimonials3DFixed.jsx
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import TopImage from "../assets/banner/customer-top.png"; // keep your top image

export default function Testimonials3DFixed() {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const reviews = [
    {
      quote: "Super fast delivery — arrived earlier than promised and the driver was polite.",
      name: "Aarav Sharma",
      role: "E-commerce Seller",
      avatar: "/images/avatar1.jpg",
    },
    {
      quote: "Live tracking was spot on. Made it easy to manage pickups for my store.",
      name: "Sarah Thompson",
      role: "Small Business Owner",
      avatar: "/images/avatar2.jpg",
    },
    {
      quote: "Fragile items arrived intact. Packaging and handling were excellent.",
      name: "Mohammed Ali",
      role: "Online Store Manager",
      avatar: "/images/avatar3.jpg",
    },
    {
      quote: "Customer support re-routed my parcel when I missed delivery — superb service!",
      name: "Emily Brown",
      role: "Digital Marketer",
      avatar: "https://www.freepik.com/free-vector/smiling-young-man-illustration_356306451.htm#fromView=keyword&page=1&position=0&uuid=ff0255ef-3794-4b24-b76c-c8de018fcd61&query=Avatar+illustration",
    },
    {
      quote: "Fast, affordable and reliable — we ship our stock with them every week.",
      name: "Jacob Martinez",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 text-center">
      {/* Top Illustration */}
      <img src={TopImage} alt="top" className="w-44 mx-auto mb-6" />

      <h2 className="text-3xl font-extrabold text-[#023737] mb-2">
        What our customers are saying
      </h2>
      <p className="text-sm text-slate-500 max-w-2xl mx-auto mb-8">
        Fast • Safe • Reliable — real feedback from people who ship with us daily.
      </p>

      {/* WRAPPER: keeps overflow hidden and adds horizontal padding so slides/nav don't overflow */}
      <div className="relative overflow-hidden px-6">
        {/* Nav buttons moved inwards (left-4/right-4) */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow hover:scale-105 transition"
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white p-3 rounded-full shadow hover:scale-105 transition"
          aria-label="Next"
        >
          ›
        </button>

        {/* Swiper (coverflow 3D) */}
        <Swiper
          onSwiper={(s) => (swiperRef.current = s)}
          modules={[Navigation, Autoplay, EffectCoverflow]}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          effect="coverflow"
          coverflowEffect={{ rotate: 18, stretch: 0, depth: 160, modifier: 1, slideShadows: true }}
          spaceBetween={24}
          slidesPerView={3} // show up to 3 slides in a row on wide screens
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
          }}
          onSlideChange={(s) => setCurrent(s.realIndex ?? s.activeIndex)}
          className="py-6"
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i} className="flex justify-center">
              {/* Constrain slide width with max-w so three slides always fit without overflowing */}
              <article
                className={`w-full max-w-[560px] rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-slate-100 transform-gpu transition-all duration-400 ${
                  current === i ? "opacity-100 scale-100" : "opacity-30 scale-95"
                }`}
                style={{ perspective: 1000 }}
              >
                {/* Quote mark */}
                <div className="text-4xl text-slate-300 mb-3">“</div>

                {/* Quote text */}
                <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed mb-6 text-left">
                  {r.quote}
                </p>

                {/* Avatar + name/role */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-50 shadow-sm flex-shrink-0">
                    {r.avatar ? (
                      <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                        👤
                      </div>
                    )}
                  </div>

                  <div className="text-left">
                    <div className="text-sm font-semibold text-[#023737]">{r.name}</div>
                    <div className="text-xs text-slate-400">{r.role}</div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className={`w-3 h-3 rounded-full transition ${current === i ? "bg-emerald-600" : "bg-slate-300"}`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
