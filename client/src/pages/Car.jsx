// src/pages/Cars.jsx
import React, { useState } from "react";
import {assets, dummyCarData} from "../assets/assets"; // path adjust करो अगर अलग हो
import CarCard from "../components/CarCard";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Cars = () => {


  const[searchParams]=useSearchParams()
  const pickupLocation = searchParams.get("pickupLocation") ;
  const pickupDate = searchParams.get("pickupDate") ;
  const returnDate = searchParams.get("returnDate") ;
  const{cars,axios}=useAppContext();
  const [input, setInput] = useState("");

  const isSearchData=pickupLocation&&pickupDate&&returnDate;
  const [filteredCars, setFilteredCars]=useState([]);

  const applyFilter=async () => {
    if(input===''){
      setFilteredCars(cars)
      return null;
    }
  

  const filtered=cars.slice().filter((car)=>{
    return car.brand.toLowerCase().includes(input.toLowerCase()) ||
    car.model.toLowerCase().includes(input.toLowerCase()) ||
    car.category.toLowerCase().includes(input.toLowerCase()) ||
    car.transmission.toString().includes(input.toLowerCase())
  })
  setFilteredCars(filtered)
  }

  const searchCarAvailabilty=async()=>{
    const {data}=await axios.post('/api/bookings/check-availability',{location :pickupLocation,pickupDate,returnDate})
  // simple filter: नाम, type, location, year पर खोज
  if(data.success){
    setFilteredCars(data.availableCars)
    if(data.availableCars.length===0){
      toast.error("No cars are available for the given dates")
  
  }return null; 
}

  }
useEffect(()=>{
  
    isSearchData&&searchCarAvailabilty()
  }
,[])

  useEffect(()=>{
    cars.length>0&&!isSearchData&&applyFilter()
  },[input, cars])
// resetting return date
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-5">Available Cars</h1>
        <p className="text-muted">Browse our selection of premium vehicles available for your next adventure</p>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="input-group" style={{ maxWidth: 700 }}>
          <img src={assets.search_icon} alt="" className="w-4.5 h-4.5 mr-2" />
          <input
            type="text"
            className="form-control"
            placeholder="Search by make, model, or features"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
         <img src={assets.filter_icon}alt="" className="w-4.5 h-4.5 mr-2" />
        </div>
      </div>

      <div className="mb-3">
        <small className="text-muted">Showing {filteredCars.length} Cars</small>
      </div>

      <div className="row g-4">
        {filteredCars.map((car,index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;