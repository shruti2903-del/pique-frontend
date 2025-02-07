import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";


export default function EnterDashNavbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName");
  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();

    const closeBtn = document.querySelector(".btn-close[data-bs-dismiss='modal']");
    if (closeBtn) closeBtn.click();

    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#fff7f5" }}>
        <div className="container-fluid">
          <Link to="/user/" className="navbar">
            <img src="../assets/pique/image/logo.png" alt="Logo" className="w-50 ms-4" />
          </Link>

          {/* Right Side Items */}
          <div className="d-flex align-items-center ms-auto">
            <Link className="nav-link mx-3 fw-bold" to="/user/">
              FAQs
            </Link>
            <Link className="nav-link mx-3 fw-bold" to="/user/">
              Contact Us
            </Link>

            {/* User Profile Button (Opens Offcanvas) */}
            <Button
              className="btn shadow-none border-0 p-0 me-3"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <img
                src="../assets/images/userpic.jpg"
                alt="User"
                className="rounded-circle"
                style={{ width: "50px", height: "50px" }}
              /><i className="fa-solid fa-caret-down"></i>
            </Button>
          </div>
        </div>
      </nav>

      {/* Offcanvas Menu */}
      <div className="offcanvas offcanvas-end rounded" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <p className="offcanvas-title fw-semibold fs-5" id="offcanvasRightLabel">Hey!! {name}</p>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <Link to="/user/profile" className="text-decoration-none fs-5 fw-semibold text-danger ms-3">
          View Profile
        </Link>

        <hr />

        <div className="offcanvas-body d-flex flex-column">
          <div className="col">
            <div className="row shadow-sm mb-4">
              <div className="col fw-medium">
              <i className="fa-solid fa-bell"></i>
              <Link className="text-decoration-none text-black text-start fw-1 ms-2" to="/user/bookingrequest">
                Booking Requests
              </Link>
            </div>
              </div>
              <div className="row shadow-sm mb-4">
                <div className="col fw-medium">
                <i className="fa-solid fa-calendar-days"></i>
                <Link className="text-decoration-none text-black text-start fw-1 ms-3" to="/user/calendar">
                Calendar
              </Link>
                </div>

            </div>

            <div className="row shadow-sm mb-4">
              {/* Logout triggers modal */}
              <div className="col fw-medium text-danger">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <Link
                className="text-decoration-none text-danger text-start fw-1 ms-3"
                to="#"
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
              >
                Logout
              </Link>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">Confirm Logout</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">Are you sure you want to log out?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}