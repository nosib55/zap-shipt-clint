
import React from "react";
import { FiPackage } from "react-icons/fi";

const services = [
  {
    title: "Express & Standard Delivery",
    desc:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    highlight: false,
  },
  {
    title: "Nationwide Delivery",
    desc:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    highlight: true, // highlighted center card
  },
  {
    title: "Fulfillment Solution",
    desc:
      "We offer customized service with inventory management support, online order processing, packaging, and after-sales support.",
    highlight: false,
  },
  {
    title: "Cash on Home Delivery",
    desc:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    highlight: false,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc:
      "Customized corporate services which include warehouse and inventory management support.",
    highlight: false,
  },
  {
    title: "Parcel Return",
    desc:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    highlight: false,
  },
];

const Services = () => {
  return (
    <section className="bg-[#073736] mt-5 rounded-2xl p-10 md:p-16 mx-4 md:mx-8">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3">Our Services</h2>
        <p className="text-sm md:text-base text-white/80 mb-10 px-4 md:px-24">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time, every time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => (
            <article
              key={idx}
              className={
                [
                  "bg-white rounded-2xl p-6 min-h-[220px] flex flex-col gap-4",
                  // highlight in center: different bg + shadow + scale
                  s.highlight
                    ? "bg-[#CAEB66] shadow-lg scale-100 border-2 border-transparent"
                    : "shadow-sm",
                  // hover / cursor effect for all cards
                  "transform transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                ].join(" ")
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") console.log("card clicked:", s.title); }}
              onClick={() => console.log("card clicked:", s.title)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={
                    [
                      "p-3 rounded-full bg-white/60 flex items-center justify-center",
                      s.highlight ? "ring-4 ring-white/30" : "ring-0"
                    ].join(" ")
                  }
                  aria-hidden
                >
                  <FiPackage className={s.highlight ? "text-[#073736]" : "text-[#0f5132]"} size={28} />
                </div>
                {/* empty spacer so icon sits left like the screenshot spacing */}
                <div className="flex-1"></div>
              </div>

              <h3 className={s.highlight ? "text-[#073736] font-semibold text-lg" : "text-[#073736] font-semibold text-lg"}>
                {s.title}
              </h3>

              <p className={s.highlight ? "text-[#073736] text-sm leading-relaxed" : "text-gray-600 text-sm leading-relaxed"}>
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
