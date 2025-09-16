import React from 'react';
import NavbarOwner from '../../components/owner/NavbarOwner';
import Sidebar from '../../components/owner/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { useEffect } from'react';
const Layout = () => {


const{isOwner,navigate}=useAppContext();

useEffect(()=>{
  if(!isOwner){
    navigate('/');
  }
},[isOwner])


  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {/* Top Navbar */}
      <NavbarOwner />

      {/* Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="flex-grow-1 p-4 bg-light">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;