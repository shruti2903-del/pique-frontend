import React, { useState } from "react";
import Select from "../Select";
import Input from "../Input";
import Button from "../Button";

export default function BookModal({
  isModalOpen,
  closeModal,
  entertainer,
  onBook,
  availableVenues,
}) {
  const [bookingFormData, setBookingFormData] = useState({
    venueId: "",
    performanceDate: "",
    performanceTime: "",
  });
  const [isBooking, setIsBooking] = useState(false); // State to toggle between details and booking form

  const handleChange = (e) => {
    setBookingFormData({
      ...bookingFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook(bookingFormData);
  };

  const handleBookClick = () => {
    setIsBooking(true); // Switch to booking form
  };

  const getFileUrl = (filePath) => {
    const formatPath = (path) =>
      `${import.meta.env.VITE_API_URL}${path.replace(/\\/g, "/")}`;

    if (Array.isArray(filePath)) {
      return filePath.map((item) => {
        if (typeof item === "string") {
          return formatPath(item);
        } else if (item && item.path) {
          return formatPath(item.path);
        }
        return "";
      });
    } else if (typeof filePath === "string") {
      return formatPath(filePath);
    } else if (filePath && filePath.path) {
      return formatPath(filePath.path);
    }
    return "";
  };

  return (
    isModalOpen && (
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            zIndex: "1050", 
          }}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex align-items-center">
                {entertainer.media &&
                  entertainer.media
                    .filter((file) => file.type === "headshot")
                    .map((headshot, index) => (
                      <img
                        key={index}
                        src={getFileUrl(headshot.url)}
                        alt={entertainer.name}
                        className="rounded-circle"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                    ))}
                <h5 className="modal-title" id="exampleModalLabel">
                  {entertainer.name}
                </h5>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Close"
              ></button>
            </div>

            <div className=" modal-body">
              {!isBooking ? (
                <div>
                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-3">
                      {entertainer.media &&
                        entertainer.media.length > 0 &&
                        entertainer.media
                          .filter(
                            (file) =>
                              file.type === "image" || file.type === "video"
                          )
                          .map((file, index) => (
                            <div key={index} className="media-item">
                              {file.type === "image" ? (
                                <img
                                  src={getFileUrl(file.url)}
                                  alt={file.name}
                                  className="media-image rounded"
                                  style={{
                                    height: "90px",
                                    width: "100px",
                                  }}
                                />
                              ) : file.type === "video" ? (
                                <video
                                  controls
                                  className="media-video rounded"
                                  style={{
                                    height: "90px",
                                  }}
                                >
                                  <source
                                    src={getFileUrl(file.url)}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              ) : null}
                            </div>
                          ))}
                    </div>
                  </div>

                  {/* Entertainer Details */}
                  <h6>{entertainer.name}</h6>
                  <p>Performance Role: {entertainer.performanceRole}</p>
                  <p>Phone: {entertainer.phone1}</p>
                  <p>Bio: {entertainer.bio}</p>
                  <p>Price per Event: {entertainer.pricePerEvent}</p>

                  {/* Book Now Button */}
                  <Button
                    type="button"
                    className=" btn-primary float-end"
                    onClick={handleBookClick}
                  >
                    Book Now
                  </Button>
                </div>
              ) : (
                // Booking Form
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="venueId" className="form-label">
                      Venue
                    </label>
                    <Select
                      name="venueId"
                      id="venueId"
                      value={bookingFormData.venueId}
                      onChange={handleChange}
                      options={availableVenues}
                      placeholder="Select a venue"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="performanceDate" className="form-label">
                      Performance Date
                    </label>
                    <Input
                      type="date"
                      name="performanceDate"
                      value={bookingFormData.performanceDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="performanceTime" className="form-label">
                      Performance Time
                    </label>
                    <Input
                      type="time"
                      name="performanceTime"
                      value={bookingFormData.performanceTime}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="modal-footer">
                    <Button
                      type="button"
                      className=" btn-danger"
                      onClick={closeModal}
                    >
                      Close
                    </Button>
                    <Button type="submit" className="btn btn-primary">
                      Submit
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
