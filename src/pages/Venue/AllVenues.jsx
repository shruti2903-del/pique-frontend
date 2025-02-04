import React, { useEffect, useState } from "react";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import axios from "axios";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function AllVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteVenueId, setDeleteVenueId] = useState(null);
  const [venueId, setVenueId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVenues = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}venues`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setVenues(Array.isArray(response.data) ? response.data : [response.data]);
      } catch (err) {
        setError("Failed to fetch venues");
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, []);

  const handleEdit = (id) => {
    setVenueId(id);
    localStorage.setItem("venueId", id);
    navigate("/loggedin/venueprofile");
  };

  const handleDeleteClick = (id) => {
    setDeleteVenueId(id);
  };

  const confirmDelete = async () => {
    if (!deleteVenueId) return;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}venues/${deleteVenueId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== deleteVenueId));
      }
    } catch (error) {
      console.error("Error deleting venue:", error);
      alert("Failed to delete venue");
    } finally {
      setDeleteVenueId(null);
    }
  };

  return (
    <DashLayoutVenue title="Venue List" description="Update and delete your venue.">
      <div className="container-fluid d-flex flex-column min-vh-100 mt-5">
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-3 pe-3">
              <div className="mx-auto">
                <h2 className="text-secondary text-center mb-0">All Venues</h2>
              </div>
              <Button className="btn-danger d-flex align-items-center" onClick={() => navigate("/loggedin/addvenue")}>
                <i className="fa-solid fa-plus me-2"></i> Add Venue
              </Button>
            </div>

            {error ? (
              <p className="text-center text-danger">{error}</p>
            ) : venues.length > 0 ? (
              <div className="table-responsive mt-5">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Website URL</th>
                      <th>Timings</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venues.map((venue, index) => (
                      <tr key={venue.id}>
                        <td>{index + 1}</td>
                        <td>{venue.name}</td>
                        <td>{venue.email}</td>
                        <td>{venue.phone}</td>
                        <td>{venue.websiteUrl}</td>
                        <td>{venue.timings}</td>
                        <td>
                          <Button className="btn-warning me-2" onClick={() => handleEdit(venue.id)} label="Edit" />
                          <Button className="btn-danger" onClick={() => handleDeleteClick(venue.id)} label="Delete" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-warning text-center mt-5">No venues available.</div>
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteVenueId && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button type="button" className="close" onClick={() => setDeleteVenueId(null)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this venue?</p>
                </div>
                <div className="modal-footer">
                  <Button className="btn-secondary" onClick={() => setDeleteVenueId(null)} label="Cancel" />
                  <Button className="btn-danger" onClick={confirmDelete} label="Delete" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <PiqueFooter />
    </DashLayoutVenue>
  );
}
