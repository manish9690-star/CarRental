import React from "react";
import { assets } from "../assets/assets"; // if you have logo + social icons here

const Footer = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={assets.logo}
                alt="CarRental Logo"
                style={{ width: "100px", marginRight: "100px" }}
              />
             
            </div>
            <p className="text-muted">
              Premium car rental service with a wide selection of luxury and
              everyday vehicles for all your driving needs.
            </p>
            {/* Social Icons */}
            <div>
              <a href="#" className="text-dark me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-dark me-3">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-dark me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-dark">
                <i className="bi bi-envelope"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 className="fw-bold">QUICK LINKS</h6>
            <ul className="list-unstyled mt-3">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Browse Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  List Your Car
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">RESOURCES</h6>
            <ul className="list-unstyled mt-3">
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted text-decoration-none">
                  Insurance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold">CONTACT</h6>
            <p className="text-muted mt-3 mb-1">1234 Luxury Drive</p>
            <p className="text-muted mb-1">San Francisco, CA 94102</p>
            <p className="text-muted mb-1">+1 234 567 890</p>
            <p className="text-muted">info@example.com</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-4">
          <small className="text-muted">
            © {new Date().getFullYear()} CarRental. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;