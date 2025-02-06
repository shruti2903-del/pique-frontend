import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function VenueDashNavbar() {
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();

    // Close modal before navigating
    const closeBtn = document.querySelector(".btn-close[data-bs-dismiss='modal']");
    if (closeBtn) closeBtn.click();

    navigate("/login");
  }

  useEffect(() => {
    document.querySelectorAll('[data-bs-dismiss="offcanvas"]').forEach(button => {
      button.addEventListener('click', () => {
        const offcanvas = document.querySelector('.offcanvas.show');
        if (offcanvas) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
          bsOffcanvas.hide();
        }
      });
    });
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#fff7f5" }}>
        <div className="container-fluid">
          <a href="index.html" className="navbar-brand">
            <img src="../assets/pique/image/logo.jpg" alt="Logo" className="w-50" />
          </a>

          {/* Right Side Items */}
          <div className="d-flex align-items-center ms-auto">
            <Link className="nav-link mx-3 fw-bold" to="/faqs">
              FAQs
            </Link>
            <Link className="nav-link mx-3 fw-bold" to="/contact">
              Contact Us
            </Link>

            {/* User Profile Button (Opens Offcanvas) */}
            <Button
              className="btn shadow-none border-0 p-0"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <img
                src="../assets/images/userpic.jpg"
                alt="User"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
            </Button>
          </div>
        </div>
      </nav>

      {/* Offcanvas Menu */}
      <div className="offcanvas offcanvas-end rounded" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel">Hey!!</h3>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>

        <a href="/user/allvenues" className="text-decoration-none fs-5 fw-semibold text-danger ms-3">
          View Profile
        </a>

        <hr />

        <div className="offcanvas-body d-flex flex-column">
          <div className="col">
            <div className="row shadow-sm p-1 mb-3">
              <Link className="text-decoration-none text-black text-start fw-1" to="/user/entertainers">
                Entertainers
              </Link>
            </div>
            <div className="row shadow-sm p-1 mb-3">
              <Link className="text-decoration-none text-black text-start fw-1" to="/user/bookings">
                Bookings
              </Link>
            </div>
            <div className="row shadow-sm p-1 mb-3">
              <Link className="text-decoration-none text-black text-start fw-1" to="/user/calendar">
                Calendar
              </Link>
            </div>
            <div className="row shadow-sm p-1 mb-3">
              {/* Logout triggers modal */}
              <Link
                className="text-decoration-none text-danger text-start fw-1"
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
