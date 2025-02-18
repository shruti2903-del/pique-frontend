import React, { useEffect, useState } from "react";
import DashLayoutVenue from "../../components/Venue/DashLayoutVenue";
import SearchBar from "../../components/Venue/SearchBar";
import ProfileSidebar from "../../components/Venue/ProfileSidebar";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";
import Button from "../../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditVenue() {
    const location = useLocation();
    const navigate = useNavigate();
    const venueData = location.state?.venue;
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (venueData) {
          setFormData(venueData);
        }
      }, [venueData]);

      useEffect(() => {
        fetchCountries();
      }, []);
    
      const fetchCountries = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}location/countries`);
          
          console.log("API Response:", response.data); 
      
          if (Array.isArray(response.data)) {
            setCountries(response.data.map((c) => ({ label: c.name, value: c.id })));
          } else if (response.data && Array.isArray(response.data.countries)) {
            // If the data is wrapped in an object
            setCountries(response.data.countries.map((c) => ({ label: c.name, value: c.id })));
          } else {
            console.error("Unexpected API response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };
      

      const fetchStates = async (countryId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}location/states?countryId=${countryId}`
          );
          console.log('API Response:', response.data);  
      
          if (Array.isArray(response.data.states)) {
            setStates(
              response.data.states.map((state) => ({
                label: state.name,
                value: state.id,
              }))
            );
          } else {
            console.error("States data is not an array", response.data);
          }
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };
      
    
      const fetchCities = async (stateId) => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}location/cities?stateId=${stateId}`
          );
          console.log('API Response:', response.data); 
      
          if (Array.isArray(response.data.cities)) {
            setCities(
              response.data.cities.map((city) => ({
                label: city.name,
                value: city.id,
              }))
            );
          } else {
            console.error("Cities data is not an array", response.data);
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      // Handle select dropdown change
      const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    
        if (name === "country") {
          fetchStates(value);
          setFormData((prev) => ({ ...prev, state: "", city: "" })); // Reset state & city
        }
        if (name === "state") {
          fetchCities(value);
          setFormData((prev) => ({ ...prev, city: "" })); // Reset city
        }
      };

    const handleSubmit = (e) => {
e.preventDefault();
console.log(formData);
    }
  return (
    <>
      <DashLayoutVenue
        title="Edit Venue"
        description="Edit your existing venue "
      >
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">
          <SearchBar />
          <div className="d-flex">
            <div className="sidebar-container">
              <ProfileSidebar />
            </div>
            <div className="profile-container">
              <p className="profile-font fw-bold">EDIT VENUE</p>
              <hr />
              <p
                className="profile-font text-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <i className="fa-solid fa-angle-left me-2"></i>Back to your venues
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row mb-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-bold">Venue Name*</label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Enter Venue Name"
                      className="form-control profile-font"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <small className="text-danger">{errors.name}</small>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-bold">Email*</label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="form-control profile-font"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <small className="text-danger">{errors.email}</small>
                    )}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-bold">
                      Phone Number*
                    </label>
                    <Input
                      type="text"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="form-control profile-font"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <small className="text-danger">{errors.phone}</small>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-bold">Description</label>
                    <Input
                      type="text"
                      name="description"
                      placeholder="Enter description"
                      className="form-control profile-font"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <small className="text-danger">
                        {errors.description}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-bold">
                      Address Line 1
                    </label>
                    <p className="profile-font text-secondary mb-0">
                      Street Address, P.O.box,c/o
                    </p>
                    <Input
                      type="text"
                      name="addressLine1"
                      placeholder="Address Line 1"
                      value={formData.addressLine1}
                      className="form-control profile-font"
                      onChange={handleChange}
                    />
                    {errors.addressLine1 && (
                      <small className="text-danger">
                        {errors.addressLine1}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="profile-font fw-bold">
                      Address Line 2
                    </label>
                    <p className="profile-font text-secondary mb-0">
                      {" "}
                      Apartment,suite,unit,building,floor,etc.
                    </p>
                    <Input
                      type="text"
                      name="addressLine2"
                      placeholder="Address Line 2"
                      value={formData.addressLine2}
                      className="form-control profile-font"
                      onChange={handleChange}
                    />
                    {errors.addressLine2 && (
                      <small className="text-danger">
                        {errors.addressLine2}
                      </small>
                    )}
                  </div>
                </div>

                <div className="row mb-2 profile-font">
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-bold">Country</label>
                    <Select
                      name="country"
                      options={countries}
                      value={formData.country || ""}
                      onChange={(e) => handleSelectChange("country", e.target.value)}
                      defaultOption="--Select Country--"
                      className="form-control profile-font"
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-bold">State</label>
                    <Select
                      name="state"
                      options={states}
                      value={formData.state || ""}
                      onChange={(e) => handleSelectChange("state", e.target.value)}
                      defaultOption="--Select State--"
                      className="form-control profile-font"
                    />
                  </div>
                </div>

                <div className="row mb-2 profile-font">
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-bold">City</label>
                    <Select
                      name="city"
                      options={cities}
                      value={formData.city}
                      onChange={(e) => handleSelectChange("city", e.target.value)}
                      defaultOption="--Select City--"
                      className="form-control profile-font"
                    />
                    {errors.city && (
                      <small className="text-danger">{errors.city}</small>
                    )}
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <label className="fw-bold">ZIP/Postal Code</label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter your zip code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="form-control profile-font"
                    />
                    {errors.zipCode && (
                      <small className="text-danger">{errors.zipCode}</small>
                    )}
                  </div>
                </div>
                <div className="row mb-2">

                </div>

                <Button
                  className="venue-btn mb-0 profile-font"
                  type="submit"
                  label="Update"
                />
              </form>
            </div>
          </div>
          <PiqueFooter />
        </div>
      </DashLayoutVenue>
    </>
  );
}
