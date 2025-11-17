import React from "react";

import Image1 from "../assets/banner/live-tracking.png";
import Image2 from "../assets/banner/safe-delivery.png";

const FeaturesList = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10 space-y-6">

      {/* 1 — Live Parcel Tracking */}
      <div className="bg-white/90 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <img src={Image1} alt="feature" className="w-32 md:w-40 object-contain" />
        <div className="hidden md:block h-24 border-l-2 border-dashed border-slate-200" />
        <div>
          <h3 className="text-[#003F3F] font-semibold mb-2">Live Parcel Tracking</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Stay updated in real-time with our live parcel tracking feature. From pick-up to 
            delivery, monitor your shipment and get instant updates.
          </p>
        </div>
      </div>

      {/* 2 — Safe Delivery */}
      <div className="bg-white/90 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <img src={Image2} alt="feature" className="w-32 md:w-40 object-contain" />
        <div className="hidden md:block h-24 border-l-2 border-dashed border-slate-200" />
        <div>
          <h3 className="text-[#003F3F] font-semibold mb-2">100% Safe Delivery</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Your parcels are handled with care and delivered securely every time. Our process 
            guarantees safe and damage-free delivery.
          </p>
        </div>
      </div>

      {/* 3 — Support */}
      <div className="bg-white/90 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
        <img src={Image2} alt="feature" className="w-32 md:w-40 object-contain" />
        <div className="hidden md:block h-24 border-l-2 border-dashed border-slate-200" />
        <div>
          <h3 className="text-[#003F3F] font-semibold mb-2">24/7 Call Center Support</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Our dedicated team is available 24/7 for any questions, updates, or delivery 
            concerns—anytime you need us.
          </p>
        </div>
      </div>

    </section>
  );
};

export default FeaturesList;
