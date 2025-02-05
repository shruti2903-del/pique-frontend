import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

export default function VenueDashNavbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid">
        
       
        <a href="index.html" className="navbar-brand">
          <img src="/src/assets/pique/image/logo.jpg" alt="Logo" className="w-50" />
        </a>

        {/* Right Side Items */}
        <div className="d-flex align-items-center ms-auto">
          <Link className="nav-link mx-3 fw-bold" to="/faqs">FAQs</Link>
          <Link className="nav-link mx-3 fw-bold" to="/contact">Contact Us</Link>

          {/* User Profile Dropdown */}
          <div className="dropdown">
            <Button
              className="dropdown-toggle shadow-none border-0 p-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="/src/assets/images/userpic.jpg"
                alt="User"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
            </Button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/loggedin/venuedash">
                  <i className="fa fa-user me-2"></i> Profile
                </Link>
              </li>
              <li>
                <button className="dropdown-item text-danger">
                  <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
