import React, { useEffect, useState } from "react";
import axios from "axios";
import VenueDashSidebar from "../../components/Venue/VenueDashSidebar";
import VenueDashNavbar from "../../components/Venue/VenueDashNavbar";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Helmet } from "react-helmet-async";

export default function AllEntertainer({ userId, id, profile }) {
  const [entertainers, setEntertainers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedEntertainer, setSelectedEntertainer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [bookingFormData, setBookingFormData] = useState({
    showTime: "",
    showDate: "",
    specialNotes: "",
    specificLocation: "",
    performanceRole: "",
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookedEntertainers, setBookedEntertainers] = useState([]);

  useEffect(() => {
    const fetchEntertainers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}venues/available/entertainer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data.entertainers)
        setEntertainers(response.data.entertainers);
      } catch (err) {
        setError("Failed to fetch entertainers.");
      }
    };

    fetchEntertainers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData({
      ...bookingFormData,
      [name]: value,
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setBookingError("No token found. Please log in again.");
      return;
    }

    const bookingData = {
      entertainerId: selectedEntertainer.id,
      showTime: bookingFormData.showTime,
      showDate: bookingFormData.showDate,
      specialNotes: bookingFormData.specialNotes,
      specificLocation: bookingFormData.specificLocation,
      performanceRole: bookingFormData.performanceRole,
      venueId: localStorage.getItem("venueId"),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}booking/createbooking`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBookingSuccess("Booking successful!");
      setBookingError(null);
      setIsBooking(false);
      setIsModalOpen(false);
      setBookedEntertainers((prevBooked) => [
        ...prevBooked,
        selectedEntertainer.id,
      ]);
    } catch (err) {
      setBookingError("Failed to create booking.");
      setBookingSuccess(null);
    }
  };

  const handleBookClick = () => {
    setIsBooking(true);
  };

  const closeModal = () => {
    setSelectedEntertainer(null);
    setIsBooking(false);
    setIsModalOpen(false);
  };

  const openModal = (entertainer) => {
    if (!bookedEntertainers.includes(entertainer.id)) {
      setSelectedEntertainer(entertainer);
      setBookingFormData({
        ...bookingFormData,
        performanceRole: entertainer.performanceRole, 
      });
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Entertainers List</title>
        <meta
          name="description"
          content="View and book entertainers according to your preferences."
        />
      </Helmet>
      <div className="container-xxl position-relative bg-light d-flex p-0">
        <VenueDashSidebar />

        <div className="content">
          <VenueDashNavbar />

          <div className="row">
            <div className="col-md-12 mt-4">
              <h2 className="text-secondary text-center mb-4">
                All Entertainers
              </h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="col-12 mt-5">
                <div className=" rounded h-100 p-4">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Sr.No.</th>
                          <th scope="col">Entertainer Name</th>
                          <th scope="col">Type</th>
                          <th scope="col">Contact No.</th>
                          <th scope="col">Price Per Event</th>
                          <th scope="col">Performance Role</th>
                          <th scope="col">Availability</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entertainers.length > 0 ? (
                          entertainers.map((entertainer, index) => (
                            <tr key={entertainer.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{entertainer.name}</td>
                              <td>{entertainer.type}</td>
                              <td>{entertainer.phone1}</td>
                              <td>₹{entertainer.pricePerEvent}</td>
                              <td>{entertainer.performanceRole}</td>
                              <td>{entertainer.availability}</td>
                              <td>
                                {bookedEntertainers.includes(entertainer.id) ? (
                                  <p className="badge bg-success">Booked</p>
                                ) : (
                                  <Button
                                    className="btn btn-primary"
                                    onClick={() => openModal(entertainer)}
                                    label="View"
                                  />
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No entertainers found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedEntertainer && isModalOpen && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              id="entertainerModal"
              aria-labelledby="entertainerModalLabel"
              aria-hidden={!isModalOpen}
            >
              <div className="modal-dialog modal-lg border-0 ">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="entertainerModalLabel">
                      {selectedEntertainer.name}
                    </h5>
                    <Button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={closeModal}
                    />
                  </div>
                  <div className="modal-body text-start text-dark">
                    {isBooking ? (
                      <>
                        <Helmet>
                          <title>Entertainer Booking Form</title>
                          <meta
                            name="description"
                            content="View and book entertainers according to your preferences."
                          />
                        </Helmet>
                        <form onSubmit={handleBookingSubmit}>
                          <div className="mb-3">
                            <label htmlFor="showTime" className="form-label">
                              Show Time
                            </label>
                            <Input
                              type="time"
                              id="showTime"
                              name="showTime"
                              className="form-control"
                              value={bookingFormData.showTime}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="showDate" className="form-label">
                              Show Date
                            </label>
                            <Input
                              type="date"
                              id="showDate"
                              name="showDate"
                              className="form-control"
                              value={bookingFormData.showDate}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="specialNotes"
                              className="form-label"
                            >
                              Special Notes
                            </label>
                            <textarea
                              id="specialNotes"
                              name="specialNotes"
                              className="form-control"
                              value={bookingFormData.specialNotes}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="specificLocation"
                              className="form-label"
                            >
                              Specific Location
                            </label>
                            <Input
                              type="text"
                              id="specificLocation"
                              name="specificLocation"
                              className="form-control"
                              value={bookingFormData.specificLocation}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="modal-footer">
                            <Button
                              type="button"
                              className="btn btn-danger"
                              onClick={closeModal}
                              label="Cancel"
                            />
                            <Button
                              type="submit"
                              className="btn btn-success"
                              label="Submit Booking"
                            />
                          </div>
                        </form>
                      </>
                    ) : (
                      <>
                        <Helmet>
                          <title>Entertainers Details</title>
                          <meta
                            name="description"
                            content="View details about entertainer."
                          />
                        </Helmet>
                        <div className="row">
                          <div className="col-md-12 text-start">
                            <p>
                              <strong>Type:</strong> {selectedEntertainer.type}
                            </p>
                            <p>
                              <strong>Bio:</strong> {selectedEntertainer.bio}
                            </p>
                            <p>
                              <strong>Performance Role:</strong>{" "}
                              {selectedEntertainer.performanceRole}
                            </p>
                            <p>
                              <strong>Phone:</strong>{" "}
                              {selectedEntertainer.phone1} /{" "}
                              {selectedEntertainer.phone2}
                            </p>
                            <p>
                              <strong>Price Per Event:</strong> ₹
                              {selectedEntertainer.pricePerEvent}
                            </p>
                            <p>
                              <strong>Social Media Links:</strong>{" "}
                              <a
                                href={selectedEntertainer.mediaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {selectedEntertainer.mediaUrl}
                              </a>
                            </p>
                            <p>
                              <strong>Vaccinated:</strong>{" "}
                              {selectedEntertainer.vaccinated}
                            </p>
                            <p>
                              <strong>Currently Available:</strong>{" "}
                              {selectedEntertainer.availability}
                            </p>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <Button
                            type="button"
                            className="btn-success w-25"
                            onClick={handleBookClick}
                            label="Book"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
