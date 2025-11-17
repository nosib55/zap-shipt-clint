import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../assets/banner/banner1.png';
import banner2 from '../assets/banner/banner2.png';
import banner3 from '../assets/banner/banner3.png';

const Banner = () => {
    return (
        <Carousel infiniteLoop={true} autoPlay={true} className='mt-5'>
            <div className="relative">
                <img src={banner1} alt="Banner 1" />

                {/* Buttons */}
                <div className="absolute bottom-21 left-1 translate-x-1/5 flex gap-6">
                    <button className="px-4 py-2 rounded-md  border-black" style={{ backgroundColor: "#CAEB66", color: "black" }}>
                        Track Your Parcel
                    </button>

                    <button 
                        className="px-4 py-2 rounded-md border border-black"
                        style={{ backgroundColor: "#ffffff", color: "black" }}
                    >
                        Be A Rider
                    </button>
                </div>
            </div>

            <div className="relative">
                <img src={banner2} alt="Banner 2" />

                <div className="absolute bottom-21 left-1 translate-x-1/5 flex gap-6">
                    <button className="px-4 py-2 rounded-md  border-black" style={{ backgroundColor: "#CAEB66", color: "black" }}>
                        Track Your Parcel
                    </button>

                    <button 
                        className="px-4 py-2 rounded-md border border-black"
                        style={{ backgroundColor: "#ffffff", color: "black" }}
                    >
                        Be A Rider
                    </button>
                </div>
            </div>

            <div className="relative">
                <img src={banner3} alt="Banner 3" />

                <div className="absolute bottom-21 left-1 translate-x-1/5 flex gap-6">
                    <button className="px-4 py-2 rounded-md  border-black" style={{ backgroundColor: "#CAEB66", color: "black" }}>
                        Track Your Parcel
                    </button>

                    <button 
                        className="px-4 py-2 rounded-md border border-black"
                        style={{ backgroundColor: "#ffffff", color: "black" }}
                    >
                        Be A Rider
                    </button>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;
