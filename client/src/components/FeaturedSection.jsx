import React from "react";
import Title from "./Title";
import CarCard from "./CarCard";
import { dummyCarData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import {motion} from 'motion/react'

const FeaturedSection = () => {


  const navigate=useNavigate();
  const{cars}=useAppContext()
  return (
    <motion.section 
    initial={{opacity:0,y:40 }}
    whileInView={{opacity:1,y:0  }}
    transition={{duration:0.5, ease:"easeInOut"  }}
    
    
    className="py-5 container">
      {/* Title */}
      <Title
        title="Featured Vehicles"
        subTitle="Explore our selection of premium vehicles available for your next adventure."
      />

      {/* ✅ Bootstrap Row for Cards */}
      <motion.div 
      initial={{opacity:0,y:40 }}
      whileInView={{opacity:1,y:0  }}
      transition={{duration:0.5, ease:"easeInOut"  }}
      
      
      
      
      className="row mt-4">
        {cars.slice(0,6).map((car) => (
          <motion.div key={car._id} 
          initial={{opacity:0,scale:0.8}} 
          whileInView={{opacity:1,scale:1  }}
          transition={{duration:0.5, ease:"easeInOut"  }}
          
          className="col-12 col-md-6 col-lg-4 mb-4">
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>
      

      {/* Button */}
      <div className="text-center mt-4">
        <motion.button  
        initial={{opacity:0,y:40 }}
        whileInView={{opacity:1,y:0  }}
        transition={{duration:0.5, delay:0.5, ease:"easeInOut"  }}
        
        onClick={()=>{
          navigate('/cars');scrollTo(0,0)
        }}    className="btn btn-outline-primary">
          Explore all cars →
        </motion.button>
      </div>
    </motion.section>
  );
};

export default FeaturedSection;