import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DashLayout from "../../DashLayout";
import { UPDATE_EVENT } from "../../../../constants";
import { toast, ToastContainer } from "react-toastify";
import AdminSideBar from "../../../components/Venue/AdminSideBar";

const EditEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state;
  //console.log(event);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    venueId: 0,
    userId: localStorage.getItem("userId"),
    description: "",
    startTime: "",
    endTime: "",
    recurring: "none",
    status: "pending",
    isAdmin: true,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (event?.id) {
      setFormData({
        ...event,
        startTime: event.startTime
          ? new Date(event.startTime).toISOString().slice(0, 16)
          : "",
        endTime: event.endTime
          ? new Date(event.endTime).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [event]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Event Name is required";
    if (!formData.location) newErrors.location = "Event Location is required";
    if (!formData.startTime) newErrors.startTime = "Start Time is required";
    if (!formData.endTime) newErrors.endTime = "End Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log(formData);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}${UPDATE_EVENT}${event.id}`,
        formData
      );
      toast.success("Event updated successfully!", { autoClose: 1000 });
    } catch (err) {
      toast.error("Failed to update event. Please try again.");
    }
  };

  return (
    <>
    <DashLayout/>
      <ToastContainer />
           <div className="container-fluid d-flex flex-column min-vh-100">
             <div className="d-flex mt-0">
               <div className="dash-sidebar-container">
                 <AdminSideBar />
               </div>
               <div className="dash-profile-container">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline-dark btn-sm float-end mb-4"
        >
          <i className="fa fa-close"></i>
        </button>
        <p className="profile-font fw-semibold mb-2">EDIT EVENT</p>
        <hr/>
        <div className="event-form">
        <p className="fw-semibold profile-font text-muted">GENERAL INFORMATION</p>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label profile-font fw-semibold mb-0">Event Name</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <div className="col-md-6">
              <label className="form-label profile-font fw-semibold mb-0">Location</label>
              <input
                type="text"
                className={`form-control ${
                  errors.location ? "is-invalid" : ""
                }`}
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>
          </div>
         
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label profile-font fw-semibold mb-0">Start Date and Time</label>
              <input
                type="datetime-local"
                className={`form-control ${
                  errors.startTime ? "is-invalid" : ""
                }`}
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
              {errors.startTime && (
                <div className="invalid-feedback">{errors.startTime}</div>
              )}
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label profile-font fw-semibold mb-0">End Date and Time</label>
              <input
                type="datetime-local"
                className={`form-control ${errors.endTime ? "is-invalid" : ""}`}
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
              />
              {errors.endTime && (
                <div className="invalid-feedback">{errors.endTime}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="form-label profile-font fw-semibold mb-0">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-outline-dark float-start btn-sm d-flex mx-auto mt-3">
            Update Event
          </button>
        </form>
        </div>
      </div>
      </div>
      </div>
      </>
  );
};

export default EditEvent;
