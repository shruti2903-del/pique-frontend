import React, { useEffect, useState } from "react";
import axios from "axios";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import Button from "../../components/Button";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}venues/booking/request`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("API Response:", response);
      setBookings(response.data.bookings || []);
    } catch (err) {
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleViewEntertainer = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBookingResponse = async (status) => {
    if (!selectedBooking) return;

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}venues/booking/response`,
        {
          bookingId: selectedBooking.id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response Updated:", response.data);
      alert(`Booking ${status} successfully!`);

      handleCloseModal();
      fetchBookings();
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking. Please try again.");
    }
  };

  return (
    <DashLayoutVenue title="All Bookings" description="View all bookings made">
      <div className="container-fluid d-flex flex-column min-vh-100 mt-5">
        <div className="row mt-5">
          <div className="col-md-12">
            <h2 className="text-secondary text-center mb-4">All Bookings</h2>
            {loading ? (
              <p className="text-center">Loading bookings...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : bookings.length > 0 ? (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Entertainer Name</th>
                      <th>Main Category</th>
                      <th>Sub Category</th>
                      <th>Performance Role</th>
                      <th>Availability</th>
                      <th>Price Per Event</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.name }</td>
                        <td>{booking.category}</td>
                        <td>{booking.specific_category}</td>
                        <td>{booking.performanceRole }</td>
                        <td>{booking.availability }</td>
                        <td>{booking.pricePerEvent }</td>

                        <td>
                          {booking.status === "accepted" ? (
                            <span className="text-success fw-bold">
                              Accepted
                            </span>
                          ) : booking.status === "rejected" ? (
                            <span className="text-danger fw-bold">
                              Rejected
                            </span>
                          ) : (
                            <Button
                              className="btn-info"
                              label="View"
                              onClick={() => handleBookingResponse("accepted")}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-warning text-center mt-5">
                No bookings yet.
              </div>
            )}
          </div>
        </div>

        {isModalOpen && selectedBooking && (
          <>
            <div
              className="modal-backdrop fade show"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1040,
              }}
              onClick={handleCloseModal}
            ></div>

            <div
              className="modal fade show"
              style={{ display: "block", zIndex: 1050 }}
              aria-labelledby="entertainerModalLabel"
              aria-hidden="false"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="entertainerModalLabel">
                      Entertainer Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleCloseModal}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {selectedBooking.entertainerUser?.entertainer ? (
                      <div>
                        <p>
                          <strong>Name:</strong>{" "}
                          {selectedBooking.entertainerUser.entertainer.name}
                        </p>
                        <p>
                          <strong>Performance Role:</strong>{" "}
                          {
                            selectedBooking.entertainerUser.entertainer
                              .performanceRole
                          }
                        </p>
                        <p>
                          <strong>Type:</strong>{" "}
                          {selectedBooking.entertainerUser.entertainer.type}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {selectedBooking.entertainerUser.entertainer.phone1} /{" "}
                          {selectedBooking.entertainerUser.entertainer.phone2}
                        </p>
                        <p>
                          <strong>Price Per Event:</strong> ₹
                          {
                            selectedBooking.entertainerUser.entertainer
                              .pricePerEvent
                          }
                        </p>
                        <p>
                          <strong>Availability:</strong>{" "}
                          {
                            selectedBooking.entertainerUser.entertainer
                              .availability
                          }
                        </p>
                        <p>
                          <strong>Bio:</strong>{" "}
                          {selectedBooking.entertainerUser.entertainer.bio}
                        </p>
                        <p>
                          <strong>Social Links:</strong>{" "}
                          {
                            selectedBooking.entertainerUser.entertainer
                              .socialLinks
                          }
                        </p>
                      </div>
                    ) : (
                      <p className="text-center text-muted">
                        No entertainer details available
                      </p>
                    )}
                  </div>
                  <div className="modal-footer">
                    {selectedBooking?.status === "accepted" ? (
                      <p className="text-success fw-bold">Accepted</p>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleBookingResponse("accepted")}
                        >
                          Confirm Booking
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleBookingResponse("rejected")}
                        >
                          Decline Booking
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <PiqueFooter />
    </DashLayoutVenue>
  );
}
