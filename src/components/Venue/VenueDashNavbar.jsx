import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PiqueNavbar() {
  const navigate = useNavigate();

  // Sidebar toggler functionality
  useEffect(() => {
    $(".sidebar-toggler").click(function () {
      $(".sidebar, .content").toggleClass("open");
      return false;
    });
  }, []);

  // Handle logout
  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();
    document.querySelector(".btn-close").click();
    navigate("/login");
  }

  return (
    <>
      <div className="container-fluid mainNavbar">
        <div className="row">
          <nav className="navbar navbar-expand-lg px-4">
            <div className="container">
           
              <a href="index.html" className="navbar-brand d-flex d-lg-none ">
          <h2 className="text-primary mb-0">
            <i className="fa fa-hashtag"></i>
          </h2>
        </a>
        <a href="#" className="sidebar-toggler flex-shrink-0">
          <i className="fa fa-bars"></i>
        </a>

              {/* Navbar Links */}
              <div className="collapse navbar-collapse" id="navbarContent">
                {/* <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  
                </ul> */}

                {/* Right-Side Buttons */}
                <div className="d-flex align-items-center ">
                  

                  {/* Logout Link */}
                  <div className="nav-item ">
                    <a
                      href="#"
                      className="nav-link text-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#logoutModal"
                    >
                      <i className="fa-solid fa-right-from-bracket me-lg-2"></i>
                      <span className="d-none d-lg-inline-flex">Logout</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Logout Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to log out?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
