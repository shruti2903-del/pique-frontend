import React from "react";
import { NavLink } from "react-router-dom";

export default function VenueDashSidebar() {
  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-light navbar-light">
        <a href="index.html" className="navbar-brand mx-4 mb-3">
          <h4 className="text-primary">
            <i className=""></i>PIQUE
          </h4>
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="/src/assets/images/userprofile.avif"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h5 className="mb-0">Venue</h5>
            {/* <span>Admin</span>   */}
          </div>
        </div>
        <div className="navbar-nav text-start w-100">
          <NavLink
            to="/venuedash"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-gauge me-2"></i>Dashboard
          </NavLink>
          <NavLink
            to="/venueprofile"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-user me-2 mt-2"></i>My Profile
          </NavLink>
        
          <NavLink
            to="/allentertainer"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-location-dot me-2 mt-2"></i>All Entertainer
          </NavLink>
          <NavLink
            to="/venuecalendar"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-primary fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-location-dot me-2 mt-2"></i>Calendar
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
