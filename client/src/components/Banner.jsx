import React from "react";
import { assets } from "../assets/assets";
import{motion} from 'motion/react'

const Banner = () => {
  return (
    <motion.div
initial={{opacity:0,y:50}}
whileInView={{opacity:1,y:0}}
transition={{duration: 0.75, ease: "easeInOut"  }}




      className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between p-5 my-4 rounded-4"
      style={{
        background: "linear-gradient(to right, #0558FE, #A9CFFF)",
        overflow: "hidden",
      }}
    >
      {/* Left Section - Text */}
      <div className="text-white mb-4 mb-md-0" style={{ maxWidth: "500px" }}>
        <h2 className="fw-bold">
          Do You Own a <span className="text-warning">Luxury Car?</span>
        </h2>
        <p className="mt-3">
          Monetize your vehicle effortlessly by listing it on CarRental.
          <br />
          We take care of insurance, driver verification and secure payments — 
          so you can earn passive income, stress-free.
        </p>
        <button className="btn btn-light fw-semibold mt-3">List your car</button>
      </div>

      {/* Right Section - Image */}
      <div>
        <motion.img
initial={{opacity:0,x:50}}

whileInView={{opacity:1,x:0}}

transition={{duration: 0.75, ease: "easeInOut",delay:0.5 }}  


          src={assets.banner_car_image}
          alt="car"
          className="img-fluid"
          style={{ maxHeight: "280px" }}
        />
      </div>
    </motion.div>
  );
};

export default Banner;