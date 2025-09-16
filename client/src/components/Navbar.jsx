import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {motion} from 'motion-react';

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, axios, setIsOwner } = useAppContext();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role",{userId: user._id});
      if (data.success) {
        setIsOwner(!isOwner);
        toast.success("Role changed successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.nav 
      initial={{y:-20,opacity:0}} 
      animate={{y:0, opacity:1}}
      transition={{type:"spring", stiffness:260, damping:20}}
      
       className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <button
          className="btn btn-link navbar-brand d-flex align-items-center fw-bold fs-4 p-0"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.logo}
            alt="logo"
            width="100"
            height="100"
            className="d-inline-block align-text-top me-2"
          />
        </button>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <div className="d-flex mx-auto gap-2 flex-wrap">
            <button
              className={`btn ${location.pathname === "/" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              Home
            </button>

            <button
              className={`btn ${location.pathname === "/cars" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => {
                navigate("/cars");
                setOpen(false);
              }}
            >
              Cars
            </button>

            <button
              className={`btn ${location.pathname === "/bookings" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => {
                navigate("/bookings");
                setOpen(false);
              }}
            >
              My Bookings
            </button>

            <button
              className="btn btn-outline-primary"
              onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            >
              {isOwner ? "Dashboard" : "List Cars"}
            </button>
          </div>

          {/* Right Side - Search + Login */}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control form-control-sm me-2"
                type="search"
                placeholder="Search cars"
              />
              <button className="btn btn-outline-secondary btn-sm" type="submit">
                🔍
              </button>
            </form>

            <button
              className="btn btn-primary px-4"
              onClick={() => (user ? logout() : setShowLogin(true))}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;