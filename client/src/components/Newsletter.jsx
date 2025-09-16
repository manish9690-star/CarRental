import React from "react";

const Newsletter = () => {
  return (
    <div className="container py-5 text-center">
      {/* Heading */}
      <h1 className="fw-bold mb-3">Never Miss a Deal!</h1>
      <p className="text-muted mb-4">
        Subscribe to get the latest offers, new arrivals, and exclusive discounts.
      </p>

      {/* Subscription Form */}
      <form className="d-flex justify-content-center">
        <div className="input-group" style={{ maxWidth: "600px" }}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email id"
            required
          />
          <button className="btn btn-primary" type="submit">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;