// src/components/Navbar.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Car";
import MyBookings from "./pages/MyBooking";

import Layout from "./pages/owner/Layout";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBooking from "./pages/owner/ManageBooking";
import Dashboard from "./pages/owner/Dashboard";
import Login from "./components/Login";
import {Toaster} from 'react-hot-toast'
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showLogin  } = useAppContext();
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Toaster */}
      <Toaster  />
      {/* Navbar */}
      {!isOwnerPath && <Navbar  />}

      {/* Login Modal */}
      {showLogin && <Login  />}

      {/* Main Content */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/bookings" element={<MyBookings />} />

          {/* Owner Routes */}
          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="manage-cars" element={<ManageCars />} />
            <Route path="manage-bookings" element={<ManageBooking />} />
          </Route>
        </Routes>
      </main>

      {/* Footer */}
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;