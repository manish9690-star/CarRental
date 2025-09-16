import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import {motion} from 'motion/react'

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&startDate=" +
        pickupDate +
        "&endDate=" +
        returnDate
    );
  };

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8}}
    className="container mt-5">
      <motion.h1 initial={{y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5,delay: 0.2 }}
      
      
      className="text-center mb-4">Luxury Cars on Rent</motion.h1>

      <motion.form
      initial={{scale:0.95, opacity: 0 ,y: -50}}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
        onSubmit={handleSearch}
        className="p-4 border rounded shadow bg-light"
      >
        <div className="row g-3 align-items-end">
          {/* Pickup Location */}
          <div className="col-md-4">
            <label htmlFor="pickup-location" className="form-label">
              Pickup Location
            </label>
            <select
              id="pickup-location"
              className="form-select"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Select Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="col-md-3">
            <label htmlFor="pickup-date" className="form-label">
              Pick-up Date
            </label>
            <input
              type="date"
              id="pickup-date"
              className="form-control"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          {/* Return Date */}
          <div className="col-md-3">
            <label htmlFor="return-date" className="form-label">
              Return Date
            </label>
            <input
              type="date"
              id="return-date"
              className="form-control"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-md-2 text-center">
            <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}

            
            type="submit" className="btn btn-primary w-100">
              <img src={assets.search_icon}alt="search" />Search
            </motion.button>
          </div>
        </div>
      </motion.form>
     <motion.img 
     initial={{y:100,opacity: 0}}
     animate={{ y: 0, opacity: 1 }}
     transition={{ duration: 0.8, delay: 1 }}
     src={assets.main_car}  alt="car"  className="max-h-75" />
    </motion.div>
  );
};

export default Hero;