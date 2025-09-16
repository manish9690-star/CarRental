import React from "react";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rohit Verma",
      location: "Lucknow, Uttar Pradesh",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      testimonial:
        "CarRental की सर्विस ने मेरी शादी में काफी मदद की। गाड़ी समय पर मिली और बहुत साफ-सुथरी थी।",
    },
    {
      id: 2,
      name: "Priya Singh",
      location: "Varanasi, Uttar Pradesh",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      testimonial:
        "वाराणसी में टूरिस्ट ट्रिप के लिए कार बुक की थी। ड्राइवर बहुत प्रोफेशनल था और पूरा सफर आरामदायक रहा।",
    },
    {
      id: 3,
      name: "Aman Yadav",
      location: "Kanpur, Uttar Pradesh",
      image: "https://randomuser.me/api/portraits/men/76.jpg",
      testimonial:
        "मुझे ऑफिस के काम से बाहर जाना पड़ा। CarRental ने बेहतरीन रेट और सर्विस दी। बहुत बढ़िया अनुभव रहा।",
    },
  ];

  return (
    <div className="container py-5">
      {/* Section Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">ग्राहक समीक्षा (Customer Testimonials)</h2>
        <p className="text-muted">
          देखिए हमारे यूज़र्स का अनुभव। अगर आपको हमारी सर्विस पसंद आई तो आप भी रिव्यू शेयर करें!
        </p>
      </div>

      {/* Testimonials Row */}
      <div className="row g-4 justify-content-center">
        {testimonials.map((t, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            key={t.id}
            className="col-md-6 col-lg-4"
          >
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
                        src="https://cdn-icons-png.flaticon.com/512/2107/2107957.png"
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