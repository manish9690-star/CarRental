import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyCarData, assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();

const {cars,axios,pickupDate,setPickupDate,returnDate,setReturnDate} = useAppContext()

  const navigate = useNavigate();


  const [car, setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY || "$";
const handleSubmit = async(e) => {
  e.preventDefault();
  console.log({ pickupDate, returnDate ,id});
  
  try{
    const {data} = await axios.post("/api/bookings/create", {pickupDate, returnDate, carId: id});
    console.log(data);
    
 
 if(data.success){
  toast.success(data.message);
   navigate("/bookings");
  }else{
    toast.error(data.message);
  }
  
} 
catch(error){
  toast.error(error.message);
}
}
  useEffect(() => {
    setCar(cars.find((car) => car._id === id) );
   
  }, [cars,id]);



  return car ? (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        {/* Left Side (Car Details) */}
        <div className="col-12 col-md-8">
          {/* Car Image */}
          <div className="text-center mb-4">
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px" }}
            />
          </div>

          {/* Car Title */}
          <div className="text-start mb-3">
            <h1 className="fw-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-muted">
              {car.category} • {car.year}
            </p>
          </div>

          <hr />

          {/* Car Info Horizontal Scroll */}
          <div className="d-flex overflow-auto mb-4 pb-2">
            {[
              { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
              { icon: assets.fuel_icon, text: car.fuel_type },
              { icon: assets.car_icon, text: car.transmission },
              { icon: assets.location_icon, text: car.location },
            ].map(({ icon, text }, index) => (
              <div
                key={index}
                className="card text-center flex-shrink-0 me-3"
                style={{ minWidth: "120px" }}
              >
                <div className="card-body p-3">
                  <img
                    src={icon}
                    alt={text}
                    className="mb-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p className="mb-0 small">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Description</h5>
              <p className="card-text">{car.description}</p>
            </div>
          </div>

          {/* Features */}
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Features</h5>
              <ul>
                {[
                  "360 Camera",
                  "Bluetooth",
                  "Backup Sensor",
                  "Cruise Control",
                  "Heated Seats",
                  "Keyless Entry",
                  "Leather Seats",
                  "Navigation System",
                  "Parking Assist",
                  "Sunroof",
                ].map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-start mb-4">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              ← Back to all cars
            </button>
          </div>
        </div>

        {/* Right Side (Booking Form) */}
        {/* Right Side (Booking Form) */}
<div className="col-12 col-md-4">
  <div className="card shadow-sm p-3">
    <h3 className="fw-bold mb-3">{currency}{car.pricePerDay} / day</h3>

    {/* Form Start */}
    <form
      onSubmit={handleSubmit}
      className="needs-validation"
    >
      <div className="mb-3">
  <label htmlFor="pickup-date" className="form-label">
    Pickup Date
  </label>
  <input
    type="date"
    id="pickup-date"
    className="form-control"
    value={pickupDate}
    onChange={(e) => setPickupDate(e.target.value)}
    required
    min={new Date().toISOString().split("T")[0]}
  />
</div>

<div className="mb-3">
  <label htmlFor="return-date" className="form-label">
    Return Date
  </label>
  <input
  value={returnDate}
  onChange={(e) => setReturnDate(e.target.value)}
    type="date"
    id="return-date"
    className="form-control"
    required
  />
</div>

      <button type="submit" className="btn btn-primary w-100">
        Book Now
      </button>
    </form>
    {/* Form End */}

    <p className="text-muted small mt-2 mb-0">
      No credit card required to reserve
    </p>
  </div>
</div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default CarDetails;