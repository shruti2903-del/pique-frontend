import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import toast, { Toaster } from "react-hot-toast";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function AddVenue() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    description: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    lat: "",
    long: "",
    amenities: [""],
    websiteUrl: "",
    timings: "",
    bookingPolicies: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [headshot, setHeadshot] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}location/countries`
        );
        setCountries(
          response.data.countries.map((country) => ({
            label: country.name,
            value: country.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const fetchStates = async (countryId) => {
    try {
      const Stateresponse = await axios.get(
        `${import.meta.env.VITE_API_URL}location/states?countryId=${countryId}`
      );
      setStates([
        ...Stateresponse.data.states.map((state) => ({
          label: state.name,
          value: state.id,
        })),
      ]);
      setCities([]);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  const fetchCities = async (stateId) => {
    try {
      const Cityresponse = await axios.get(
        `${import.meta.env.VITE_API_URL}location/cities?stateId=${stateId}`
      );
      setCities([
        ...Cityresponse.data.cities.map((city) => ({
          label: city.name,
          value: city.id,
        })),
      ]);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    for (let field in formData) {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("Name:", name, "Value:", value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "country") {
      fetchStates(value);
    }
    if (name === "state") {
      fetchCities(value);
    }
  };



  const handleDeleteImage = (index) => {
    setImages((prev) => {
      const updatedImages = prev.filter((_, i) => i !== index);
      setFormData((prevData) => ({ ...prevData, images: updatedImages }));
      return updatedImages;
    });
  };

  const handleDeleteVideo = (index) => {
    setVideos((prev) => {
      const updatedVideos = prev.filter((_, i) => i !== index);
      setFormData((prevData) => ({ ...prevData, videos: updatedVideos }));
      return updatedVideos;
    });
  };

  const handleDeleteHeadshot = () => {
    setHeadshot(null);
    setFormData((prevData) => ({ ...prevData, headshot: "" }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files);

    if (type === "images") {
      setImages((prev) => [...prev, ...files]);
    } else if (type === "videos") {
      setVideos((prev) => [...prev, ...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}venues`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Venue added successfully:", response.data);
      toast.success("Venue added successfully!");
      const venueId = response.data.id;
      localStorage.setItem("venueId", venueId);
      setFormSubmitted(true);
    } catch (err) {
      console.error("Error submitting form:", err.response || err.message);
      toast.error("Failed to submit the form.");
    }
  };

  const mediaUpload = async (e) => {
    e.preventDefault();
    if (!formSubmitted) {
      toast.error("Please submit the form before uploading media.");
      return;
    }
    try {
      const mediaFormData = new FormData();

      // if (headshot) {
      //   mediaFormData.append("headshot", headshot);
      // }

      images.forEach((image) => {
        mediaFormData.append("images", image);
      });

      videos.forEach((video) => {
        mediaFormData.append("videos", video);
      });

      const venueId = localStorage.getItem("venueId");
      mediaFormData.append("venueId", venueId);

      const token = localStorage.getItem("token");
      const mediaUploadResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}media/uploads`,
        mediaFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Media upload response:", mediaUploadResponse.data);
      toast.success("Media uploaded successfully!");
      navigate("/user/allvenues");
    } catch (error) {
      console.error(
        "Error uploading media:",
        error.response?.data || error.message
      );
      toast.error("Failed to upload media. Please try again.");
    }
  };

  return (
    <>
      <DashLayoutVenue title="Add Venue" description="Add a new venue ">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">
          <div className="row mt-4">
            <div className="col-md-12">
              <Button
                onClick={() => navigate(-1)}
                className="btn-danger d-flex align-items-center"
              >
                <i className="fa fa-arrow-left"></i>
              </Button>
              <h2 className="text-secondary text-center mb-3">Add Venue</h2>
              {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                  <strong>Please fill out all required fields:</strong>
                  <ul>
                    {Object.keys(errors).map((field) => (
                      <li key={field}>{errors[field]}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="justify-content-center">
                <div className="card col-md-11 shadow-lg p-5">
                  <div className="card-body text-center">
                    <form onSubmit={handleSubmit}>
                      <h4 className="text-start text-danger">
                        General Information
                      </h4>
                      <hr className="fw-bold" />
                      <div className="row">
                        <div className="col-md-4 text-start">
                          <label htmlFor="name" className="fw-bold">
                            Name
                          </label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          {errors.name && (
                            <small className="text-danger">{errors.name}</small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="phone" className="fw-bold">
                            Phone
                          </label>
                          <Input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && (
                            <small className="text-danger">
                              {errors.phone}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="email" className="fw-bold">
                            Email
                          </label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <small className="text-danger">
                              {errors.email}
                            </small>
                          )}
                        </div>
                      </div>
                      <h4 className="text-start mt-4 text-danger">
                        Address Details
                      </h4>
                      <hr className="fw-bold" />
                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="country" className="fw-bold">
                            Country
                          </label>
                          <Select
                            name="country"
                            options={countries}
                            value={formData.country}
                            onChange={handleChange}
                          defaultOption="Select Country"
                          />
                          {errors.country && (
                            <small className="text-danger">
                              {errors.country}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="state" className="fw-bold">
                            State
                          </label>
                          <Select
                            name="state"
                            options={states}
                            value={formData.state}
                            onChange={handleChange}
                            defaultOption="Select State"
                          />
                          {errors.state && (
                            <small className="text-danger">
                              {errors.state}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="city" className="fw-bold">
                            City
                          </label>
                          <Select
                            name="city"
                            options={cities}
                            value={formData.city}
                            onChange={handleChange}
                            defaultOption="Select City"
                          />
                          {errors.city && (
                            <small className="text-danger">{errors.city}</small>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="addressLine1" className="fw-bold">
                            Address Line 1
                          </label>
                          <Input
                            type="text"
                            name="addressLine1"
                            placeholder="Address Line 1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                          />
                          {errors.addressLine1 && (
                            <small className="text-danger">
                              {errors.addressLine1}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="addressLine2" className="fw-bold">
                            Address Line 2
                          </label>
                          <Input
                            type="text"
                            name="addressLine2"
                            placeholder="Address Line 2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                          />
                          {errors.addressLine2 && (
                            <small className="text-danger">
                              {errors.addressLine2}
                            </small>
                          )}
                        </div>

                        <div className="col-md-4 text-start">
                          <label htmlFor="zipCode" className="fw-bold">
                            Zip Code
                          </label>
                          <Input
                            type="text"
                            name="zipCode"
                            placeholder="Enter your zip code"
                            value={formData.zipCode}
                            onChange={handleChange}
                          />
                          {errors.zipCode && (
                            <small className="text-danger">
                              {errors.zipCode}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="location" className="fw-bold">
                            Description
                          </label>
                          <Input
                            type="text"
                            name="description"
                            placeholder="Describe your venue"
                            value={formData.description}
                            onChange={handleChange}
                          />
                          {errors.description && (
                            <small className="text-danger">
                              {errors.description}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="lat" className="fw-bold">
                            Latitude
                          </label>
                          <Input
                            type="text"
                            name="lat"
                            placeholder=" "
                            value={formData.lat}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="long" className="fw-bold">
                            Longitude
                          </label>
                          <Input
                            type="text"
                            name="long"
                            placeholder=""
                            value={formData.long}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <h4 className="text-start text-danger mt-4">
                        Venue Information
                      </h4>
                      <hr className="fw-bold" />
                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="amenities" className="fw-bold">
                            Amenities
                          </label>
                          <Input
                            type="text"
                            name="amenities"
                            placeholder="List your amenities"
                            value={formData.amenities}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="websiteUrl" className="fw-bold">
                            Website URL
                          </label>
                          <Input
                            type="text"
                            name="websiteUrl"
                            placeholder="Enter your website URL"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="timings" className="fw-bold">
                            Timings
                          </label>
                          <Input
                            type="time"
                            name="timings"
                            value={formData.timings}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col-md-12 text-start">
                          <label htmlFor="bookingPolicies" className="fw-bold">
                            Booking Policies
                          </label>
                          <Input
                            type="text"
                            name="bookingPolicies"
                            value={formData.bookingPolicies}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="btn-danger mt-3 w-25 fw-semibold"
                        label="Submit"
                      />
                    </form>
                  </div>
                </div>
                {formSubmitted && (
                  <div className="card col-md-11 shadow-lg p-5">
                    <div className="card-body ">
                      <form onSubmit={mediaUpload}>
                        <h4 className="text-start text-danger">Media Upload</h4>
                        <hr className="mb-4" />

                        {/* Headshot Upload */}
                        {/* <div className="row mb-3">
                      <div className="col-md-12 col-sm-12">
                        <label className="fw-bold">Headshot Profile Pic</label>
                        <Input
                          type="file"
                          name="headshot"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "headshot")}
                        />
                        {headshot && (
                          <div className="position-relative">
                            <img
                              src={URL.createObjectURL(headshot)}
                              alt="Headshot preview"
                              className="media-image rounded"
                              style={{ height: "90px", width: "90px" }}
                            />
                            <button
                              type="button"
                              className="btn btn-link position-absolute"
                              onClick={handleDeleteHeadshot}
                            >
                              <i className="fa-solid fa-trash-can text-danger"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div> */}

                        {/* Image Upload */}
                        <div className="row mt-4">
                          <div className="col-md-12 col-sm-12">
                            <label className="fw-bold">Image Upload</label>
                            <Input
                              type="file"
                              name="images"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleFileChange(e, "images")}
                            />
                            {images.length > 0 && (
                              <div className="d-flex flex-wrap gap-3">
                                {images.map((file, index) => (
                                  <div
                                    key={index}
                                    className="position-relative p-2"
                                  >
                                    <img
                                      src={URL.createObjectURL(file)}
                                      alt={`Uploaded image ${index}`}
                                      className="media-image rounded"
                                      style={{ height: "90px", width: "90px" }}
                                    />
                                    <Button
                                      type="button"
                                      className="btn btn-link position-absolute"
                                      onClick={() => handleDeleteImage(index)}
                                    >
                                      <i className="fa-solid fa-trash-can text-danger"></i>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Video Upload */}
                        <div className="row mt-4">
                          <div className="col-md-12 col-sm-12">
                            <label className="fw-bold">Video Upload</label>
                            <Input
                              type="file"
                              name="videos"
                              accept="video/*"
                              multiple
                              onChange={(e) => handleFileChange(e, "videos")}
                            />
                            {videos.length > 0 && (
                              <div className="d-flex flex-wrap gap-3">
                                {videos.map((file, index) => (
                                  <div
                                    key={index}
                                    className="position-relative p-2"
                                  >
                                    <video
                                      src={URL.createObjectURL(file)} // Preview the video
                                      controls
                                      className="media-video rounded"
                                      style={{ height: "90px", width: "90px" }}
                                    />
                                    <Button
                                      type="button"
                                      className="btn btn-link position-absolute"
                                      onClick={() => handleDeleteVideo(index)}
                                    >
                                      <i className="fa-solid fa-trash-can text-danger"></i>
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="row mt-4">
                          <div className="col d-flex justify-content-center">
                            <Button
                              type="submit"
                              className="btn-danger w-25 fw-bold"
                              label="Upload Media"
                              disabled={!formSubmitted}
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <PiqueFooter />
        </div>
      </DashLayoutVenue>
    </>
  );
}
