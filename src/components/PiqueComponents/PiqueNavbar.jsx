import React from "react";
import { Link } from "react-router-dom";

export default function PiqueNavbar() {
  return (
    <>
    <div className="container-fluid mainNavbar">
      <div className="row">
        <nav id="navbar1" className="navbar navbar-expand-lg px-4">
          <div className="container">
            {/* <!-- Logo Section --> */}
            <a className="navbar-brand d-flex align-items-center" href="/">
              <img src="src/assets/pique/image/logo.png" alt="logo" className="logoMain" />
            </a>

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
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 me-3">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Why We</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Blog</a>
                </li>
              </ul>

              {/* <!-- Right-Side Buttons --> */}
              <div className="d-flex align-items-center">
                <a href="#" className="btn myBTNB me-3">
                  Register <i className="fa-solid fa-arrow-up"></i>
                </a>
                <a href="#" className="btn myBTNB me-3">
                  Login <i className="fa-solid fa-arrow-up"></i>
                </a>
                <div className="dropdown">
                  <button
                    className="btn flagBG dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="src/assets/pique/image/usa.png" alt="India" width="20" /><span
                      className="ms-1">USA</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li><a className="dropdown-item" href="#">USA</a></li>
                    <li><a className="dropdown-item" href="#">UK</a></li>
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
