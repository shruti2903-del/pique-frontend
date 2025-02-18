import React, { useEffect } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import Button from "../Button";

export default function VenueDashNavbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("UserName");
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;

  useEffect(() => {
    if (user) {
      navigate("/user/", { replace: true });
      window.history.pushState(null, null, window.location.href);
    }
    const handleBackButton = () => {
      window.history.pushState(null, null, window.location.href);
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.clear();

    const closeBtn = document.querySelector(
      ".btn-close[data-bs-dismiss='modal']"
    );
    if (closeBtn) closeBtn.click();

    navigate("//");
  }

  return (
    <>
      <div className="container-fluid mainNavbar fixed-top">
        <div className="row">
          <nav id="navbar1" className="navbar navbar-expand-lg px-4">
            <div className="container">
              {/* <!-- Logo Section --> */}
              <Link className="navbar-brand d-flex align-items-center" to="/user/">
                <img
                  src={`${imagePath}logo.png`}
                  alt="logo"
                  className="logoMain"
                />
              </Link>

              {/* <!-- Toggle Button for Mobile View --> */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* <!-- Navbar Links --> */}
              <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="#"
                    >
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Why We
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      Blog
                    </Link>
                  </li>
                </ul>

                <div className="d-flex align-items-center ">
                  <Button
                    className="btn shadow-none border-0 p-0"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <img
                      src={`${imagePath}userpic.jpg`}
                      alt="User"
                      className="rounded-circle"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <i className="fa-solid fa-caret-down"></i>
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end rounded"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <p
            className="offcanvas-title fw-semibold fs-5"
            id="offcanvasRightLabel"
          >
            Hey!!
          </p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <Link
          to="/user/profile"
          className="text-decoration-none fs-5 fw-semibold text-danger ms-3"
        >
          View Profile
        </Link>

        <hr />

        <div className="offcanvas-body d-flex flex-column">
          <div className="col">
            <div className="row shadow-sm mb-4">
              <div className="col">
                <i className="fa-solid fa-masks-theater"></i>
                <Link
                  className="text-decoration-none text-black text-start fw-1 ms-2"
                  to="/user/entertainers"
                >
                  Entertainers
                </Link>
              </div>
            </div>
            <div className="row shadow-sm mb-4">
              <div className="col">
                <i className="fa-regular fa-calendar-check"></i>
                <Link
                  className="text-decoration-none text-black text-start fw-1 ms-3"
                  to="/user/bookings"
                >
                  Bookings
                </Link>
              </div>
            </div>
            <div className="row shadow-sm mb-4">
              <div className="col">
                <i className="fa-solid fa-calendar-days"></i>
                <Link
                  className="text-decoration-none text-black text-start fw-1 ms-3"
                  to="/user/calendar"
                >
                  Calendar
                </Link>
              </div>
            </div>
            <div className="row shadow-sm mb-4">
              {/* Logout triggers modal */}
              <div className="col text-danger">
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
            <div className="modal-body">Are you sure you want to log out?</div>
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
