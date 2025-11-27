import React, { useState } from "react";

export default function SendParcel() {
  const [parcelType, setParcelType] = useState("Document");

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex justify-center py-10 px-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow p-10">

        {/* Title */}
        <h1 className="text-4xl font-bold text-[#0B2C3D] mb-2">
          Send A Parcel
        </h1>
        <p className="text-gray-600 mb-8">Enter your parcel details</p>

        {/* Toggle */}
        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="parcel-type"
              checked={parcelType === "Document"}
              onChange={() => setParcelType("Document")}
              className="accent-lime-600 w-4 h-4"
            />
            <span className="text-lg font-medium">Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="parcel-type"
              checked={parcelType === "Non-Document"}
              onChange={() => setParcelType("Non-Document")}
              className="accent-lime-600 w-4 h-4"
            />
            <span className="text-lg font-medium">Not-Document</span>
          </label>
        </div>

        <hr className="my-6" />

        {/* Parcel Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Parcel Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-3 bg-gray-50"
              placeholder="Parcel Name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Parcel Weight (KG)</label>
            <input
              type="number"
              className="w-full border rounded-lg px-4 py-3 bg-gray-50"
              placeholder="Parcel Weight (KG)"
            />
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

          {/* Sender */}
          <div>
            <h2 className="text-xl font-semibold text-[#0B2C3D] mb-4">Sender Details</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Sender Name</label>
                <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-50" placeholder="Sender Name" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Address</label>
                <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-50" placeholder="Address" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Sender Phone No</label>
                <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-50" placeholder="Sender Phone No" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your District</label>
                <select className="w-full border rounded-lg px-4 py-3 bg-gray-50">
                  <option>Select your District</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                  <option>Sylhet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Pickup Instruction</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-3 bg-gray-50"
                  placeholder="Pickup Instruction"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h2 className="text-xl font-semibold text-[#0B2C3D] mb-4">Receiver Details</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Receiver Name</label>
                <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-50" placeholder="Receiver Name" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Receiver Address</label>
                <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-50" placeholder="Receiver Address" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Receiver Contact No</label>
                <input type="text" className="w-full border rounded-lg px-4 py-3 bg-gray-50" placeholder="Receiver Contact No" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Receiver District</label>
                <select className="w-full border rounded-lg px-4 py-3 bg-gray-50">
                  <option>Select your District</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                  <option>Sylhet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Delivery Instruction</label>
                <textarea
                  className="w-full border rounded-lg px-4 py-3 bg-gray-50"
                  placeholder="Delivery Instruction"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Text */}
        <p className="text-sm text-gray-600 mt-6">* PickUp Time 4pm-7pm Approx.</p>

        {/* Confirm Button */}
        <button className="mt-8 bg-lime-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-lime-600">
          Proceed to Confirm Booking
        </button>

      </div>
    </div>
  );
}
