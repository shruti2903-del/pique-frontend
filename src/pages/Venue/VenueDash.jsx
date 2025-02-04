import React from "react";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function VenueDash() {
  return (
    <>
      <DashLayoutVenue
        title="Venue Dashboard"
        description="View and manage your work"
      >
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">
        <div className="col-md-12 mt-4">
          <h2 className="text-secondary text-center">Venue Dashboard</h2>
        </div>
        <div className="flex-grow-1" />
        </div>
        <PiqueFooter />

      </DashLayoutVenue>
    </>
  );
}
