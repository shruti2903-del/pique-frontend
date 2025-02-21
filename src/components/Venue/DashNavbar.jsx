import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function VenueDashNavbar() {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    // Sidebar toggler functionality
    $(".sidebar-toggler").click(function () {
      $(".sidebar, .content").toggleClass("open");
      return false;
    });
  }, []);

  function handleLogout() {
    localStorage.clear(); // Clear the local storage on logout
    document.querySelector(".btn-close").click(); // Close the logout modal
    navigate("/admin/login", { replace: true }); // Redirect to the login page
  }

  return (
    <>
      <div className="" style={{ borderBottom: "1px solid #f3f3f3" }}>
        <nav
          className="navbar navbar-expand  navbar-light sticky-top px-4 py-0 w-100 "
          style={{ border: "1px white" }}
        >
          <a href="/admin" className="navbar-brand d-flex d-lg-none me-4">
            <h2 className="text-primary mb-0">
              <i className="fa fa-hashtag"></i>
            </h2>
          </a>
          <a href="/" className="sidebar-toggler flex-shrink-0">
            <i className="fa fa-bars"></i>
          </a>
          <form className="d-none d-md-flex ms-4">
            {/* <input
            className="form-control border-0"
            type="search"
            placeholder="Search"
          /> */}
          </form>

          <div className="navbar-nav align-items-center ms-auto">
            <div className="nav-item  d-flex">
              <div className="d-flex nav-link  align-items-center ms-4 mb-4">
                <div className="position-relative">
                  <img
                    className="rounded-circle"
                    src="/assets/images/userprofile.avif"
                    alt="user"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                </div>
                <div className="ms-3">
                  <h5 className="mb-0">Hey {userdata?.name}</h5>
                  {/* <span>Admin</span>   */}
                </div>
              </div>
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
        </nav>

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
      </div>
    </>
  );
}
