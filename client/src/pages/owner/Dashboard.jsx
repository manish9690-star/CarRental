import React, { useState, useEffect } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const {axios ,isOwner,currency}= useAppContext();
  // State for dashboard data
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    monthlyRevenue: 0,
    recentBookings: [],
  });

  // useEffect to load dummy data (future me API call aayega yaha)
  
  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending Bookings", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Completed Bookings", value: data.completedBookings, icon: assets.check_icon },
  ];
  const fetchDashboardData = async () => {
    try{
      const {data}=await axios.get('/api/owner/dashboard');
     if(data.success){
       setData(data.dashboardData);
     }else{
      toast.error(data.message);
    }
  }catch(error){
      toast.error(error.message);
    }
  
  }

  useEffect(() => {
    if(isOwner){
      fetchDashboardData();
    }
    },[isOwner]);
  return (
    <div className="container-fluid p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <p className="text-muted">
          Manage overall platform performance including total cars, bookings,
          pending & completed bookings.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="row mb-4">
        {dashboardCards.map((card, index) => (
          <div key={index} className="col-md-3 col-sm-6 mb-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center">
                <img
                  src={card.icon}
                  alt={card.title}
                  style={{ width: "32px", height: "32px", marginRight: "10px" }}
                />
                <div>
                  <h6 className="text-muted mb-1">{card.title}</h6>
                  <h4 className="fw-bold mb-0">{card.value}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Recent Bookings */}
      <div className="row">
        {/* Monthly Revenue */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-semibold">Monthly Revenue</h5>
              <h2 className="fw-bold text-primary">${data.monthlyRevenue}</h2>
              <p className="text-muted mb-0">Revenue for current month</p>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="col-md-8 mb-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h5 className="fw-semibold mb-3">Recent Bookings</h5>
              <ul className="list-group list-group-flush">
                {data.recentBookings.length > 0 ? (
                  data.recentBookings.map((booking) => (
                    <li
                      key={booking._id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <h6 className="mb-0">
                          {booking.car.brand} {booking.car.model}
                        </h6>
                        <small className="text-muted">{booking.status}</small>
                      </div>
                      <span className="fw-bold text-success">
                        ${booking.price}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-muted text-center">
                    Loading recent bookings...
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;