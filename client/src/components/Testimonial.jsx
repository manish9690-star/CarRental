import React from "react";
import { assets } from "../assets/assets" ;
import{motion} from 'motion/react'

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      id: 2,
      name: "John Smith",
      location: "New York, USA",
      image: assets.testimonial_image_2,
      testimonial:
        "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    },
    {
      id: 3,
      name: "Ava Johnson",
      location: "Sydney, Australia",
      image: assets.testimonial_image_1,
      testimonial:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

  return (
    <div className="container py-5">
      {/* Section Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Customer Testimonials</h2>
        <p className="text-muted">
          Hear what our users say about us. We're always looking for ways to
          improve. If you had a positive experience, share your review!
        </p>
      </div>

      {/* Testimonials Row */}
      <div className="row g-4 justify-content-center">
        {testimonials.map((t, index) => (
          <motion.div
          initially={{ opacity: 0, y: 40 }}
          whileInview={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,delay: index * 0.1 }}
            viewport={{once: true ,amount: 0.4 }}
          
          
          
          
          key={index} className="col-md-6 col-lg-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                {/* Profile */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="rounded-circle me-3"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{t.name}</h6>
                    <small className="text-muted">{t.location}</small>
                  </div>
                </div>

                {/* Stars - Horizontal */}
                <div className="d-flex align-items-center mb-3">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <img
                        key={i}
                        src={assets.star_icon}
                        alt="star"
                        className="me-1"
                        style={{ width: "16px", height: "16px" }}
                      />
                    ))}
                </div>

                {/* Testimonial */}
                <p className="text-muted fst-italic">"{t.testimonial}"</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;