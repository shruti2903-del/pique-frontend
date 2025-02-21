import React from "react";
import { NavLink } from "react-router-dom";

export default function ProfileSidebar() {
  const name = localStorage.getItem("userName")
  return (
    <div className="p-2 profile-font">
      <p className="fs-5 fw-bold mb-1">Account</p>
      <p className="text-muted small">{name}</p>
      <nav className="nav flex-column position-relative">
        {[
          { to: "/user/profile", icon: "fa-user", label: "PROFILE" },
          { to: "/user/venues", icon: "fa-building", label: "YOUR VENUES" },
          { to: "/user/bookings", icon: "fa-bookmark", label: "YOUR BOOKINGS" },
          { to: "/user/invoices", icon: "fa-file-invoice", label: "INVOICES & PAYMENTS" },
          { to: "/user/ratings", icon: "fa-folder-plus", label: "RATINGS & REVIEWS" },
          { to: "/user/notifications", icon: "fa-bell", label: "NOTIFICATIONS & REMINDERS" },
        ].map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-link py-2 px-3 d-flex align-items-center position-relative sidebar-link ${isActive ? "active-link" : ""
              }`
            }
          >
            <i className={`fa-solid ${icon} me-3 fs-5 icon-transition`}></i>
            <span className="text-dark">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
