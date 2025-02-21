import React, { useEffect, useState } from "react";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/Venue/SearchBar";
import axios from "axios";
import Input from "../../components/Input";
import toast, { Toaster } from "react-hot-toast";

export default function EntertainerDetails() {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  const location = useLocation();
  const navigate = useNavigate();
  const entertainerId = localStorage.getItem("entertainerId");
  const [entertainer, setEntertainer] = useState({});
  const [loading, setLoading] = useState(true);
  const [showTime, setShowTime] = useState("");
  const [showDate, setShowDate] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  useEffect(() => {
    const fetchEntertainerDetails = async () => {
      if (!entertainerId) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL
          }venues/entertainer-profile/${entertainerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Fetched entertainer:", response.data.entertainer);
        setEntertainer(response.data?.entertainer || {});
      } catch (error) {
        console.error("Error fetching entertainer details:", error);
        setEntertainer({});
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainerDetails();
  }, [entertainerId]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const venueId = localStorage.getItem("userId");
    const entertainerId = localStorage.getItem("entertainerId");

    const formData = new FormData(e.target);
    const showTime = formData.get("showTime");
    const showDate = formData.get("showDate");
    const specialNotes = formData.get("specialNotes");

    if (!showTime || !showDate) {
      alert("Please select show time and date.");
      return;
    }

    const bookingData = {
      entertainerId: Number(entertainerId),
      venueId: Number(venueId),
      performanceRole: entertainer.performanceRole,
      showTime: showTime,
      showDate: showDate,
      specialNotes: specialNotes,
      eventId: 7,
    };
    console.log(bookingData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}venues/createbooking`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        toast.success("Booking request sent successfully!");
      } else {
        toast.error("Failed to send booking request.");
      }
    } catch (error) {
      console.log("Error creating booking:", error);
      toast.error("An error occurred while booking.");
    }
  };

  return (
    <DashLayoutVenue
      title="Entertainer Profile"
      description="View and book entertainer according to your preferences."
    >
      <div className="d-flex flex-column min-vh-100">
        <Toaster position="top-center" reverseOrder={false} />
        <SearchBar
          updateFilters={(filters) => setSearchParams(filters)}
          
        />
        <div className="container ">
          <p
            className="fw-semibold modal-font mt-3"
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-angle-left me-2"></i>Back to Entertainers
            Search
          </p>
          <p className="fw-semibold fs-4 mb-0 mt-4">{entertainer.name}</p>
          <div className="row d-flex justify-content-between column-gap-5">
            {!loading && entertainer?.media?.length > 0 ? (
              <div className="row">
                {entertainer?.media?.filter(media => media.type === "image").length > 0 ? (
                  <>
                    <div className="col-md-7">
                      <img
                        src={entertainer.media.find(media => media.type === "image")?.url}
                        alt="Main Entertainer Image"
                        className="img-fluid rounded-4 main-image"
                        style={{ width: "100%", height: "400px", objectFit: "cover" }}
                      />
                    </div>

                    <div className="col-md-5 d-flex flex-wrap gap-2">
                      {entertainer?.media
                        ?.filter(media => media.type === "image")
                        .slice(1, 5)
                        .map((media, index) => (
                          <img
                            key={index}
                            src={media.url}
                            alt={`Entertainer Image ${index + 2}`}
                            className="img-fluid rounded-4 small-image"
                            style={{
                              width: "48%", 
                              height: "190px",
                              objectFit: "cover",
                            }}
                          />
                        ))}
                    </div>
                  </>
                ) : (
                  <p>No images available</p>
                )}
              </div>

            ) : (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-grow text-dark" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            <div className="row gap-5">
              <div className="col-md-7">
              <div className="row">
                <div className="col-md-4 mt-5">
                  <h4>Booking Info</h4>
                </div>
                <div className="col-md-7 mt-5 modal-font">
                  <div className="row">
                    <div className="col-md-6 fw-semibold">
                      <p>Vaccination Status:</p>
                      <p>Price Per Event:</p>
                      <p>Performance Role:</p>
                    </div>
                    <div className="col-md-6">
                      <p>{entertainer.vaccinated}</p>
                      <p>Rs.{entertainer.pricePerEvent}</p>
                      <p>{entertainer.performanceRole}</p>
                    </div>
                  </div>
                  <hr />
                  <p className="fw-semibold">About</p>
                  <p>{entertainer.bio}</p>
                  <hr />
                  <div className="row">
                    <div className="col-md-6 fw-semibold">
                      <p>Contact Number 1:</p>
                      <p>Contact Number 2:</p>
                      <p>Social Links:</p>
                    </div>
                    <div className="col-md-6">
                      <p>{entertainer.phone1}</p>
                      <p>{entertainer.phone2}</p>
                      <p>{entertainer.socialLinks}</p>
                    </div>
                  </div>
                  </div>
                  </div>
              </div>

              <div className="col-md-5 mt-3 profile-container">
              {entertainer?.vaccinated && (
                <span
                  className={`vaccination-badge ${entertainer.vaccinated === "yes"
                    ? "vaccinated-orange"
                    : "vaccinated-red"
                    }`}
                >
                  Vaccinated
                </span>
              )}
              <div className="d-flex flex-column align-items-center">
    {entertainer?.media?.length > 0 && (
      <img
        src={
          entertainer.media.find((m) => m.type === "headshot")?.url ||
          "../assets/pique/image/alfonso4.avif"
        }
        alt={entertainer?.name || "No name available"}
        className="img-fluid rounded-circle"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
        }}
      />
    )}

    <h4 className="mt-3">{entertainer.name}</h4>
  </div>
              {/* <h4 className="mt-3 text-start">{entertainer.name}</h4> */}
              <div className="row d-flex justify-content-start mt-4">
                <form onSubmit={handleBookingSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <p className="profile-font">Show time</p>
                      <Input
                        type="time"
                        className="form-control profile-font"
                        name="showTime"
                        value={showTime}
                        onChange={(e) => setShowTime(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <p className="profile-font">Show Date</p>
                      <Input
                        type="date"
                        className="form-control profile-font"
                        name="showDate"
                        value={showDate}
                        onChange={(e) => setShowDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <p className="mt-2 profile-font">Special Notes</p>
                  <textarea
                    className="form-control profile-font"
                    placeholder="Enter your message here..."
                    rows="4"
                    value={specialNotes}
                    name="specialNotes"
                    onChange={(e) => setSpecialNotes(e.target.value)}
                  ></textarea>
                  <Button
                    className="btn-danger profile-font rounded-3 w-100 mt-3"
                    type="submit"
                    label="Send Booking Request"
                  />
                </form>
                </div>
              </div>
            </div>

            {/* <div className="col-md-4 mt-5 profile-container">
              {entertainer?.vaccinated && (
                <span
                  className={`vaccination-badge ${entertainer.vaccinated === "yes"
                    ? "vaccinated-orange"
                    : "vaccinated-red"
                    }`}
                >
                  Vaccinated
                </span>
              )}
              {entertainer?.media?.length > 0 && (
                <img
                  src={
                    entertainer.media.find((m) => m.type === "headshot")?.url ||
                    "../assets/pique/image/alfonso4.avif"
                  }
                  alt={entertainer?.name || "No name available"}
                  className="img-fluid rounded-circle"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
              <h4 className="mt-3 text-start">{entertainer.name}</h4>
              <div className="row d-flex justify-content-start mt-4">
                <form onSubmit={handleBookingSubmit}>
                  <div className="row">
                    <div className="col-6">
                      <p>Show time</p>
                      <Input
                        type="time"
                        name="showTime"
                        value={showTime}
                        onChange={(e) => setShowTime(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <p>Show Date</p>
                      <Input
                        type="date"
                        name="showDate"
                        value={showDate}
                        onChange={(e) => setShowDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <p className="mt-2">Special Notes</p>
                  <textarea
                    className="form-control"
                    placeholder="Enter your message here..."
                    rows="4"
                    value={specialNotes}
                    name="specialNotes"
                    onChange={(e) => setSpecialNotes(e.target.value)}
                  ></textarea>
                  <Button
                    className="btn-danger w-100 mt-3"
                    type="submit"
                    label="Send Booking Request"
                  />
                </form>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <PiqueFooter />
    </DashLayoutVenue>
  );
}
