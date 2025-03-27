import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
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
    //document.querySelector(".btn-close").click(); // Close the logout modal
    navigate("/admin/login", { replace: true }); // Redirect to the login page
  }

  return (
    <>
      <div className="container-fluid w-100">
        <div className="row">
          <nav id="navbar1" className="navbar navbar-expand-lg p-2">
            <div className="container-fluid">
              {/* <!-- Logo Section --> */}
              <Link
                className="navbar-brand d-flex align-items-center"
                to="/venue"
              >
                <img
                  src={`${imagePath}newLogo.png`}
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

              <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav mx-auto ">
                  <p className="fw-semibold fs-6 nav-font mt-3">
                    Entertainment | Education | Engagement
                  </p>
                </ul>

                <div className="d-flex align-items-center">
                  <div className="dropdown ms-3">
                    <button
                      className="btn d-flex align-items-center"
                      type="button"
                      id="venueDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        backgroundColor: "#E0E0E0",
                        borderRadius: "50px",
                        fontSize: "small",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        height: "46px",
                        width: "109px",
                      }}
                    >
                      Admin
                      <div
                        className="ms-2"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: "#333333",
                          padding: "11px",
                        }}
                      >
                        <img
                          src={`${
                            import.meta.env.VITE_BASE
                          }assets/pique/image/Icon ion-menu.svg`}
                          alt="Menu"
                          className="menu-icon"
                        />
                      </div>
                    </button>

                    <ul
                      className="dropdown-menu custom-drop-menu dropdown-menu-end"
                      aria-labelledby="venueDropdown"
                    >
                      <li>
                        <Link className="nav-link custom-drop-item" to="">
                          <span>Admin Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="" className="nav-link custom-drop-item" onClick={handleLogout}>
                            Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
