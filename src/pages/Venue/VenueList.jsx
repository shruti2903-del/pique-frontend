import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import VenueTable from "../../components/Venue/VenueTable";

export default function VenueList() {
  const [expanded, setExpanded] = useState({});
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState({ parent: null, children: [] });

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}venues`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Venue Data:", response.data);

      if (response.data?.status && response.data.venues.length > 0) {
        const parentVenue = response.data.venues.find(
          (venue) => venue.isParent
        );
        const childVenues = response.data.venues.filter(
          (venue) => !venue.isParent
        );

        setVenues({ parent: parentVenue || null, children: childVenues });
      } else {
        console.warn("No venues found.");
        setVenues({ parent: null, children: [] });
      }
    } catch (error) {
      console.error("Error fetching venues:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const navigate = useNavigate();

  const handleAddVenueClick = () => {
    navigate("/user/add", { state: { venue: venues.parent } });
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
        ) : venues.parent ? (
          <div className="row ">
            <div className="col-md-7">
              <h5 className="fw-semibold mb-3 venue-title">
                {venues.parent.name}
              </h5>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Owner Name : </span>
                {localStorage.getItem("userName")}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Email Address : </span>
                {venues.parent.email}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Contact Number : </span>
                {venues.parent.phone}
              </p>
              <p className="profile-font mb-1">
                <span className="fw-semibold">Booking Policies : </span>
                {venues.parent.bookingPolicies}
              </p>
              <p className="profile-font">
                <span className="fw-semibold">Description: </span>
                {expanded[venues.parent.id]
                  ? venues.parent.description
                  : truncateText(venues.parent.description, 20)}
                {venues.parent.description.split(" ").length > 20 && (
                  <Button
                    className="btn btn-link profile-font p-0 ms-1"
                    onClick={() => toggleExpand(venues.parent.id)}
                  >
                    {expanded[venues.parent.id] ? "Show Less" : "Show More"}
                  </Button>
                )}
              </p>
            </div>
            <div className="col-md-5">
              <img
                src="../assets/pique/image/venue1.avif"
                className="img-fluid rounded-4"
                style={{ height: "13em", width: "25rem" }}
                alt={venues.parent.name}
              />
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">No venues found.</p>
        )}
      </div>
      <hr />

      {!loading && (
        <VenueTable
          venues={venues}
          setVenues={setVenues}
          selectedVenue={selectedVenue}
          setSelectedVenue={setSelectedVenue}
          handleEditClick={handleEditClick}
        />
      )}
    </>
  );
}
