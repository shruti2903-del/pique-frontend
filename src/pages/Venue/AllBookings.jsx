import React, { useEffect, useState } from "react";
import axios from "axios";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import Button from "../../components/Button";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import moment from "moment/moment";

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
      <div className="container-fluid d-flex flex-column min-vh-100">
        <SearchBar />
        <div className="d-flex">
          <div className="sidebar-container">
            <ProfileSidebar />
          </div>
          <div className="profile-container">
            <p className="profile-font fw-bold">BOOKINGS</p>
            <hr />

            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d-flex justify-content-center my-5">
                    <div className="spinner-grow text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <p className="text-center text-danger">{error}</p>
                ) : bookings.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr className="profile-font">
                          <th>Sr.No.</th>
                          <th>Entertainer</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Price Per Event</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody className="profile-font text-secondary">
                        {bookings.map((booking, index) => (
                          <tr key={booking.id}>
                            <td>{index + 1}</td>
                            <td>{booking.name}</td>
                            <td>
                              <span className={`status-badge status-${booking.status.replace(" ", "-").toLowerCase()}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td>{moment(booking.showDate).format("DD-MMM-YYYY").toUpperCase()}</td>
                            <td>{booking.pricePerEvent}</td>

                            <td>
                              <Button type="button" className="btn btn-sm"><i className="fa-regular fa-eye"></i></Button>
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


          </div>
        </div>
      </div>
      <PiqueFooter />
    </DashLayoutVenue>
  );
}
