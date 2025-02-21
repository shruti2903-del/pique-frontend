import React from "react";
import VenueDashSidebar from "../components/Venue/DashSidebar";
import VenueDashNavbar from "../components/Venue/DashNavbar";
import { Helmet } from "react-helmet-async";

export default function DashLayout({ children }) {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="View and manage your Admin details."
        />
      </Helmet>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <VenueDashSidebar />

        {/* <!-- Content Start --> */}
        <div className="content">
          {/* <!-- Navbar Start --> */}
          <VenueDashNavbar />
          {/* <!-- Navbar End --> */}
          <div className="row">
            <div className="col-md-12 mt-4">{children}</div>
          </div>
        </div>
        {/* <!-- Content End --> */}
      </div>
    </>
  );
}
