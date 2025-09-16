import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const NavbarOwner = () => {
  const {user}=useAppContext(); 

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom px-3">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img src={assets.logo} alt="logo" height="40" />
        </Link>

        {/* User Info */}
        <div className="d-flex align-items-center">
          <span className="me-2 fw-semibold">Welcome,{user?.name||"Owner"}</span>
         
        </div>
      </div>
    </nav>
  );
};

export default NavbarOwner;