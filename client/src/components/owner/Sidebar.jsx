import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dummyUserData, ownerMenuLinks,assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const location = useLocation();
  const {user,axios,fetchUser } = useAppContext();
  const [image,setImage]= useState('');
  // Image change handler


  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      const { data } = await axios.post('/api/owner/update-image', formData);
      if (data.success) {
        fetchUser();
        toast.success(data.message);
      setImage('');
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div
      className="d-flex flex-column bg-white border-end"
      style={{ width: "250px", height: "100vh" }}
    >
      {/* User Profile */}
      <div className="text-center p-4 border-bottom">
        <div className="position-relative d-inline-block">
          <img
            src={user?.image || dummyUserData.image}
            alt="User"
            className="rounded-circle mb-2"
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />
{image && (
  <button 
    className="btn btn-sm btn-outline-primary position-absolute top-0 end-0 d-flex align-items-center gap-1 p-2" 
    onClick={updateImage}
  >
    Save 
    <img src={assets.check_icon} width={13} alt="" />
  </button>
)}

<p className="mt-2 fs-6 d-none d-md-block">
  {user?.name}
</p>

          {/* Edit Icon (click to open file input) */}
          <label
            htmlFor="profile-upload"
            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1"
            style={{ cursor: "pointer", fontSize: "12px" }}
          >
            ✎
          </label>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => setImage(e.target.files[0])}
          />
        </div>

       
      </div>

      {/* Menu Items */}
      <ul className="nav flex-column mt-3">
        {ownerMenuLinks.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <li key={index} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center px-3 py-2 ${
                  isActive ? "active text-primary fw-bold" : "text-dark"
                }`}
              >
                <img
                  src={isActive ? item.coloredIcon : item.icon}
                  alt={item.name}
                  className="me-2"
                  style={{ width: "20px", height: "20px" }}
                />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;