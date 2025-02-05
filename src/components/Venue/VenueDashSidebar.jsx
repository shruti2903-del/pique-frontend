import React from "react";
import { NavLink } from "react-router-dom";

export default function VenueDashSidebar() {
  return (
    <div 
      className="sidebar pe-4 pb-3 vh-100" 
    >
      <nav className="navbar d-flex flex-column align-items-center">
        

        {/* Sidebar Navigation */}
        <div className="navbar-nav text-start w-100">
        
          <NavLink to="/loggedin/venuedash" className={({ isActive }) => `nav-link ${isActive ? "text-danger fw-bold" : ""}`}>
            <i className="fa-solid fa-gauge me-2"></i> Dashboard
          </NavLink>

          <NavLink to="/loggedin/allvenue" className={({ isActive }) => `nav-link ${isActive ? "text-danger fw-bold" : ""}`}>
            <i className="fa-solid fa-clipboard-list me-2"></i> All Venues
          </NavLink>

         
          <NavLink to="/loggedin/allentertainer" className={({ isActive }) => `nav-link ${isActive ? "text-danger fw-bold" : ""}`}>
            <i className="fa-solid fa-location-dot me-2"></i> All Entertainer
          </NavLink>

          <NavLink to="/loggedin/allbookings" className={({ isActive }) => `nav-link ${isActive ? "text-danger fw-bold" : ""}`}>
            <i className="fa-solid fa-list-check me-2"></i> All Bookings
          </NavLink>

          <NavLink to="/loggedin/venuecalendar" className={({ isActive }) => `nav-link ${isActive ? "text-danger fw-bold" : ""}`}>
            <i className="fa-solid fa-calendar-days me-2"></i> Calendar
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
