import React from "react";
import { FiMapPin, FiTruck } from "react-icons/fi";

const steps = [
  {
    title: "Booking Pick & Drop",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FiTruck size={40} className="text-[#003F3F]" />,
  },
  {
    title: "Cash On Delivery",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FiTruck size={40} className="text-[#003F3F]" />,
  },
  {
    title: "Delivery Hub",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FiTruck size={40} className="text-[#003F3F]" />,
  },
  {
    title: "Booking SME & Corporate",
    description:
      "From personal packages to business shipments — we deliver on time, every time.",
    icon: <FiTruck size={40} className="text-[#003F3F]" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-[#E7ECEF] rounded-3xl mt-5 py-16 px-4">
      <h2 className="text-3xl font-bold text-[#003F3F] mb-10">
        How it Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-4"
          >
            {step.icon}
            <h3 className="text-lg font-semibold text-[#003F3F]">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
