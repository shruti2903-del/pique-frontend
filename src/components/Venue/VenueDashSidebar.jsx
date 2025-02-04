import React from "react";
import { NavLink } from "react-router-dom";

export default function VenueDashSidebar() {
  return (
    <div className="sidebar pe-4 pb-3 " style={{ backgroundColor: "#fff7f5" }}>
      <nav className="navbar" >
        <a href="index.html" className="navbar-brand mx-4 mb-3">
        <img
            src="/src/assets/pique/image/logo.jpg" 
            alt="Logo"
            className="logo-sidebar w-100"
          />
        </a>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src="/src/assets/images/userpic.jpg"
              alt=""
              style={{ width: "70px", height: "70px" }}
            />
            <div className="rounded-circle position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h5 className="mb-0">Venue</h5>
            {/* <span>Admin</span>   */}
          </div>
        </div>
        <div className="navbar-nav text-start w-100">
          <NavLink
            to="/loggedin/venuedash"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-danger fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-gauge me-2"></i>Dashboard
          </NavLink>
          <NavLink
            to="/loggedin/allvenue"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-danger fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-clipboard-list me-2 mt-2"></i>All Venues
          </NavLink>
         
          <NavLink
            to="/loggedin/allentertainer"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-danger fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-location-dot me-2 mt-2"></i>All Entertainer
          </NavLink>
          <NavLink
            to="/loggedin/allbookings"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-danger fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-list-check me-2 mt-2"></i>All Bookings
          </NavLink>
          <NavLink
            to="/loggedin/venuecalendar"
            className={({ isActive }) =>
              `nav-link  ${isActive ? "text-danger fw-bold " : ""}`
            }
          >
            <i className="fa-solid fa-calendar-days me-2 mt-2"></i>Calendar
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
