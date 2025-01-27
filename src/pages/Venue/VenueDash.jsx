import React from "react";
import VenueDashSidebar from "../../components/Venue/VenueDashSidebar";
import VenueDashNavbar from "../../components/Venue/VenueDashNavbar";
import { Helmet } from "react-helmet-async";

export default function VenueDash() {
  return (
    <>
      <Helmet>
        <title>Venue Dashboard</title>
        <meta name="description" content="View and manage your venue details." />
      </Helmet>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <VenueDashSidebar />

        {/* <!-- Content Start --> */}
        <div className="content">
          {/* <!-- Navbar Start --> */}
          <VenueDashNavbar />
          {/* <!-- Navbar End --> */}
          <div className="row">
            <div className="col-md-12 mt-4">
              <h2 className="text-secondary text-center">Venue Dashboard</h2>
            </div>
          </div>
        </div>
        {/* <!-- Content End --> */}


      </div>
    </>
  );
}
