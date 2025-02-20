import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../components/Spinner";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import ProfileCard from "../../components/Venue/ProfileCard";

export default function VenueProfile() {
  // console.log("hello");
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
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isPrefilled, setIsPrefilled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [venueId, setVenueId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("venueId");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}venues/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        const user = response.data.venue || {};
        setFormData({
          name: user.name || "",
          phone: user.phone || "",
          email: user.email || "",
          addressLine1: user.addressLine1 || "",
          addressLine2: user.addressLine2 || "",
          description: user.description || "",
          city: user.city || "",
          state: user.state || "",
          zipCode: user.zipCode || "",
          country: user.country || "",
          lat: user.lat || "",
          long: user.long || "",
          amenities: user.amenities || [],
          websiteUrl: user.websiteUrl || "",
          // timings: user.timings || "",
          bookingPolicies: user.bookingPolicies || "",
        });
        setIsPrefilled(true);

        if (user.country) {
          fetchStates(user.country);
        }
        if (user.state) {
          fetchCities(user.state);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}location/countries`
        );
        console.log("countries", response);
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

  const handleChange = (e, value = null) => {
    const name = e?.target?.name || e; // Handle both cases
    const newValue = value ?? e?.target?.value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (name === "country") {
      fetchStates(newValue);
    }
    if (name === "state") {
      fetchCities(newValue);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("venueId");
    setVenueId(id);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      // const userData = {};
      const venueData = {
        name: formData.name || "",
        phone: formData.phone || "",
        email: formData.email || "",
        addressLine1: formData.addressLine1 || "",
        addressLine2: formData.addressLine2 || "",
        description: formData.description || "",
        city: formData.city || null,
        state: formData.state || null,
        zipCode: formData.zipCode || "",
        country: formData.country || null,
        lat: formData.lat || "",
        long: formData.long || "",
        amenities: formData.amenities || [],
        websiteUrl: formData.websiteUrl || "",
        // timings: formData.timings,
        bookingPolicies: formData.bookingPolicies || "",
        venueId: venueId,
      };
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}venues/update`,
        venueData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Venue updated successfully:", response.data);
      toast.success("Venue updated successfully!");
    } catch (err) {
      console.error("Error updating form:", err.response?.data || err.message);
      toast.error("Failed to update the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashLayoutVenue
        title="Update Profile"
        description="View and manage your profile"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <div className="container-fluid d-flex flex-column min-vh-100">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
            </div>
            <div className="profile-container">
              <ProfileCard />
            </div>
          </div>
          {/* <div className="row mt-5">
            <div className="col-md-12">
              <Button
                onClick={() => navigate(-1)}
                className="btn-danger d-flex align-items-center"
              >
                <i className="fa fa-arrow-left"></i>
              </Button>
              <h2 className="text-secondary text-center">Update Profile</h2>
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
              <div className="d-flex justify-content-center">
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
                            value={formData.country || ""}
                            onChange={(selectedOption) =>
                              handleChange("country", selectedOption.value)
                            }
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
                            value={formData.state || ""}
                            onChange={(selectedOption) =>
                              handleChange({
                                name: "state",
                                value: selectedOption.value,
                              })
                            }
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
                            value={formData.city || ""}
                            onChange={(selectedOption) =>
                              handleChange({
                                name: "city",
                                value: selectedOption.value,
                              })
                            }
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
              </div>
            </div>
          </div> */}
        </div>
        <PiqueFooter />
      </DashLayoutVenue>
    </>
  );
}
