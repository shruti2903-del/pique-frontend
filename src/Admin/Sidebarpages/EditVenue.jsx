import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DashLayout from "../DashLayout";
import {
  GET_CITIES,
  GET_COUNTRIES,
  GET_STATES,
  UPDATE_VENUE,
} from "../../../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditVenue() {
  const token = localStorage.getItem("token");
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const { venueData } = location.state || {};

  const [formData, setFormData] = useState(() => {
    return venueData
      ? { ...venueData }
      : {
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
        };
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}${GET_COUNTRIES}`
        );
        console.log(response.data);

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
        `${import.meta.env.VITE_API_URL}${GET_STATES}${countryId}`
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
        `${import.meta.env.VITE_API_URL}${GET_CITIES}${stateId}`
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
  useEffect(() => {
    if (venueData?.country) {
      fetchStates(venueData.country);
    }
    if (venueData?.state) {
      fetchCities(venueData.state);
    }
  }, [venueData]);

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

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "country") {
      fetchStates(value);
    }
    if (name === "state") {
      fetchCities(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const venueDataforApi = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        description: formData.description,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        lat: formData.lat,
        long: formData.long,
        amenities: formData.amenities,
        websiteUrl: formData.websiteUrl,
        timings: formData.timings,
        bookingPolicies: formData.bookingPolicies,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}${UPDATE_VENUE}`,
        { id: venueData.id, fieldsToUpdate: venueDataforApi },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Venue updated successfully:", response.data);
      toast.success("Venue Updated successfully!", {
        autoClose: 1000, // Close after 1 second
      });
      //navigate(-1);
    } catch (err) {
      console.error("Error updating form:", err.response || err.message);
      toast.error("Error deleting venue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashLayout>
      <>
        <div className="conatiner mt-1">
          <div className=" mt-1">
            <div className="d-flex">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-primary d-flex align-items-center mb-1 m-2"
              >
                <i
                  className="fa fa-arrow-left"
                  style={{ marginRight: "8px" }}
                ></i>
              </button>
              <h5 className="text-secondary text-center mb-3 col">
                Update Venue Details
              </h5>
            </div>

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

            <form onSubmit={handleSubmit} className="conatiner m-1 p-1">
              <div className="row card shadow-lg  p-2 text-start ">
                <h5 className=" text-primary">General Information</h5>
                <hr className="fw-bold" />
                <div className="row mb-3 mt-1">
                  <div className="col-md-4 p-2 ">
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
                  <div className="col-md-4 p-2 ">
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
                      <small className="text-danger">{errors.phone}</small>
                    )}
                  </div>
                  <div className="col-md-4 p-2 ">
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
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>
                </div>
              </div>
              <div className="row card shadow-lg  p-2 text-start ">
                <h5 className="text-start mt-2 text-primary">
                  Address Details
                </h5>
                <hr className="fw-bold" />
                <div className="row mb-3 mt-2">
                  <div className="col-md-4 text-start">
                    <label htmlFor="country" className="fw-bold">
                      Country
                    </label>
                    <Select
                      name="country"
                      options={countries}
                      value={formData.country}
                      onChange={handleChange}
                      defaultOption={
                        venueData ? venueData.country : "Select Country"
                      }
                    />
                    {errors.country && (
                      <small className="text-danger">{errors.country}</small>
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
                      defaultOption={
                        venueData ? venueData.state : "Select State"
                      }
                    />
                    {errors.state && (
                      <small className="text-danger">{errors.state}</small>
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
                      defaultOption={venueData ? venueData.city : "Select City"}
                    />
                    {errors.city && (
                      <small className="text-danger">{errors.city}</small>
                    )}
                  </div>
                </div>
                <div className=" row mb-3 mt-2">
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
                      <small className="text-danger">{errors.zipCode}</small>
                    )}
                  </div>
                </div>
                <div className=" row mb-3 mt-2">
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
              </div>
              <div className="row card shadow-lg  p-2 pb-4 text-start ">
                <h5 className="text-start text-primary mt-2">
                  Venue Information
                </h5>
                <hr className="fw-bold" />
                <div className=" row mb-3 mt-2">
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

                <div className=" row ">
                  <div className="col-md-12 text-start">
                    <label htmlFor="bookingPolicies" className="fw-bold">
                      Booking Policies
                    </label>
                    <textarea
                      type="text"
                      name="bookingPolicies"
                      className="form-control"
                      value={formData.bookingPolicies}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center my-3">
                <Button
                  type="submit"
                  className="btn-primary  float-center  w-25 fw-semibold"
                  label="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </>
      <ToastContainer />
    </DashLayout>
  );
}
