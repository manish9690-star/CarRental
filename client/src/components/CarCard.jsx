import React from "react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate=useNavigate();

  return (
    <div   onClick={()=>{navigate(`/car-details/${car._id}`);scrollTo(0,0)}} className="card h-100 shadow-sm" style={{ maxWidth: "320px", margin: "0 auto" }}>
      {/* Image Section */}
      <div className="position-relative">
        <img
          src={car.image}
          className="card-img-top"
          alt={car.name}
          style={{ height: "180px", objectFit: "cover" }}  // ✅ Fixed height
        />

        {/* Availability Badge */}
        {car.isAvailable && (
          <span className="badge bg-success position-absolute top-0 start-0 m-2">
            Available Now
          </span>
        )}

        {/* Price Badge */}
        <span className="badge bg-dark position-absolute bottom-0 end-0 m-2">
          {currency}{car.pricePerDay} / day
        </span>
      </div>

      {/* Info Section */}
      <div className="card-body p-3">
        <h6 className="card-title mb-1 fw-bold">{car.brand}</h6>
        <p className="text-muted small mb-2">
          {car.model} • {car.year}
        </p>

        {/* Horizontal details */}
        <div className="d-flex justify-content-between text-muted small">
          <span>🚘 {car.seating_capacity}</span>
          <span>⚡ {car.fuel_type}</span>
          <span>⚙ {car.transmission}</span>
          <span>📍 {car.location}</span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;