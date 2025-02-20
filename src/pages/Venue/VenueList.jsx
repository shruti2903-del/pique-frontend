import React, { useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function VenueList({ venues, loading }) {
    const [expanded, setExpanded] = useState({});
    const [selectedVenue, setSelectedVenue] = useState(null);

  const navigate = useNavigate();
  const handleAddVenueClick = () => {
    navigate("/user/add");
  };
  
  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
 
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleEditClick = (venue) => {
    setSelectedVenue(venue);
  };
  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="fw-bold profile-font mb-0">YOUR VENUES </p>
        <Button
          className="venue-btn btn-sm mb-0"
          type="button"
          label="Add Location"
          onClick={handleAddVenueClick}
        />
      </div>
      <hr />

      <div className="row ">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : venues.length > 0 ? (
          <div className="row ">
            <div className="col-md-7">
              <h5 className="fw-semibold mb-3 venue-title">{venues[0].name}</h5>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Owner Name : </span>
                {localStorage.getItem("userName")}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Email Address : </span>
                {venues[0].email}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Contact Number : </span>
                {venues[0].phone}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Booking Policies : </span>
                {venues[0].bookingPolicies}
              </p>
              <p className="profile-font">
                <span className="fw-semibold">Description: </span>
                {expanded[venues[0].id]
                  ? venues[0].description
                  : truncateText(venues[0].description, 20)}
                {venues[0].description.split(" ").length > 20 && (
                  <Button
                    className="btn btn-link profile-font p-0 ms-1"
                    onClick={() => toggleExpand(venues[0].id)}
                  >
                    {expanded[venues[0].id] ? "Show Less" : "Show More"}
                  </Button>
                )}
              </p>
            </div>
            <div className="col-md-5">
              <img
                src="../assets/pique/image/venue1.avif"
                className="img-fluid rounded-4"
                style={{ height: "13em", width: "25rem" }}
                alt={venues[0].name}
              />
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">No venues found.</p>
        )}
      </div>
      <hr />
      <div className="row">
        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-grow text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : venues.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="profile-font">
                    <th>Sr.No.</th>
                    <th>Address Line 1</th>
                    <th>Address Line 2</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="profile-font text-secondary">
                  {venues.map((venue, index) => (
                    <tr key={venue.id}>
                      <td>{index + 1}</td>
                      <td>{venue.addressLine1}</td>
                      <td>{venue.addressLine2}</td>
                      <td>{venue.email}</td>
                      <td>{venue.phone}</td>
                      <td>
                        <Button className="btn btn-warning rounded-5 btn-sm" onClick={() => handleEditClick(venue)}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                        <Button className="btn btn-danger rounded-5 ms-1 btn-sm">
                          <i className="fa-solid fa-trash"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center mt-4">No venues found.</p>
        )}
      </div>

      {selectedVenue && (
        <> 
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Venue</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedVenue(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Venue Name</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedVenue.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={selectedVenue.email}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={selectedVenue.phone}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      defaultValue={selectedVenue.description}
                    ></textarea>
                  </div>
                  <div className="modal-footer">
                    <Button
                      className="btn btn-secondary"
                      onClick={() => setSelectedVenue(null)}
                    >
                      Close
                    </Button>
                    <Button className="btn btn-primary">Save Changes</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
        
      )}
    </>
  );
}
