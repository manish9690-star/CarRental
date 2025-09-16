// src/pages/MyBookings.jsx
// src/pages/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
const MyBookings = () => {

  const{axios,user,currency}=useAppContext();
  const [bookings, setBookings] = useState([]);
  
  // Dummy fetch
  const fetchMyBookings = async () => {
   try{
    const {data}=await axios.get('/api/bookings/user');
     if (data.success) {
      const sortedBookings = data.bookings.sort((a, b) => 
        new Date(b.start_date) - new Date(a.start_date)
      )
      setBookings(sortedBookings);
    } else {
      toast.error(data.message);
    }
   }catch(error){
    toast.error(error.message);
 
  };
  }
  useEffect(() => {
    user&&fetchMyBookings();
  }, [user]);

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="mb-4">
        <h2 className="fw-bold">My Bookings</h2>
        <p className="text-muted">View and manage all your car bookings</p>
      </div>

      {/* Booking Cards */}
      <div className="d-flex flex-column gap-4">
        {bookings.map((b, index) => (
          <div
            key={b._id}
            className="card shadow-sm border-0"
            style={{ borderRadius: "12px" }}
          >
            <div className="row g-0">
              {/* Left: Car Image */}
              <div className="col-md-3">
                <img
                  src={b.car.image}
                  className="img-fluid h-100"
                  style={{ objectFit: "cover", borderRadius: "12px 0 0 12px" }}
                  alt={b.car.brand + " " + b.car.model}
                />
              </div>

              {/* Right: Booking Details */}
              <div className="col-md-9">
                <div className="card-body d-flex flex-column flex-md-row justify-content-between">
                  {/* Booking Info */}
                  <div>
                    <h6 className="mb-2">
                      Booking #{index + 1}{" "}
                      <span
                        className={`badge ${
                          b.status === "confirmed"
                            ? "bg-success"
                            : b.status === "pending"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {b.status}
                      </span>
                    </h6>

                    <p className="mb-1">
                      <i className="bi bi-calendar"></i>{" "}
                      {new Date(b.pickupDate).toISOString().split("T")[0]} To{" "}
                      {new Date(b.returnDate).toISOString().split("T")[0]}
                    </p>

                    <p className="mb-1">
                      <i className="bi bi-geo-alt"></i> Pick-up Location{" "}
                      <strong>{b.car.location}</strong>
                    </p>

                    <h5 className="mt-2 mb-0">
                      {b.car.brand} {b.car.model}
                    </h5>
                    <small className="text-muted">
                      {b.car.year} · {b.car.category} · {b.car.location}
                    </small>
                  </div>

                  {/* Price Info */}
                  <div className="text-end mt-3 mt-md-0">
                    <h5 className="text-primary">{currency}{b.price}</h5>
                    <small className="text-muted">
                      Booked on {new Date(b.createdAt).toISOString().split("T")[0]}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* If no bookings */}
        {bookings.length === 0 && (
          <p className="text-center text-muted">No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;