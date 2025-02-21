import React, { useEffect, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [headshot, setHeadshot] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [loading, setLoading] = useState(true)
  const [venue, setVenue] = useState({
    name: "",
    addressLine1: "",
    addressLine2: "",
    country: 0,
    state: 0,
    city: 0,
    zipCode: "",
    phone: "",
    email: "",
    description: "",
  });

  const fetchVenues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}venues`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Venue Response:", response.data.venues[0].id);
      localStorage.setItem("venueId", response.data.venues[0].id)


      if (response.data?.status && Array.isArray(response.data.venues)) {
        const venueData = response.data.venues[0] || {}; // Get first venue or empty object

        setVenue({
          name: venueData.name || "",
          addressLine1: venueData.addressLine1 || "",
          addressLine2: venueData.addressLine2 || "",
          country: venueData.country || 0,
          state: venueData.state || 0,
          city: venueData.city || 0,
          zipCode: venueData.zipCode || "",
          phone: venueData.phone || "",
          email: venueData.email || "",
          description: venueData.description || "",
        });

        setIsEditing(true);
        setHeadshot(venueData.media?.[0]?.url || null);
        fetchStates(venueData.country);
        fetchCities(venueData.state);
      } else {
        console.warn("No venues found.");
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




  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}location/countries`
      );

      console.log("API Response:", response.data); // Debugging line

      if (Array.isArray(response.data)) {
        setCountries(
          response.data.map((c) => ({ label: c.name, value: c.id }))
        );
      } else if (response.data && Array.isArray(response.data.countries)) {
        // If the data is wrapped in an object
        setCountries(
          response.data.countries.map((c) => ({ label: c.name, value: c.id }))
        );
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId) => {
    if (!countryId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}location/states?countryId=${countryId}`
      );
      console.log("States API Response:", response.data);

      if (Array.isArray(response.data)) {
        setStates(response.data.map((s) => ({ label: s.name, value: s.id })));
      } else if (response.data && Array.isArray(response.data.states)) {
        setStates(
          response.data.states.map((s) => ({ label: s.name, value: s.id }))
        );
      } else {
        console.error(
          "Unexpected API response format for states:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    if (!stateId) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}location/cities?stateId=${stateId}`
      );
      console.log("Cities API Response:", response.data);

      if (Array.isArray(response.data)) {
        setCities(response.data.map((c) => ({ label: c.name, value: c.id })));
      } else if (response.data && Array.isArray(response.data.cities)) {
        setCities(
          response.data.cities.map((c) => ({ label: c.name, value: c.id }))
        );
      } else {
        console.error(
          "Unexpected API response format for cities:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenue((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "country") {
      setStates([]);
      setCities([]);
      fetchStates(value);
    }

    if (name === "state") {
      setCities([]);
      fetchCities(value);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_MEDIA_URL}media/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status && response.data.fileUrl) {
        setVenue({ ...venue, imageUrl: response.data.fileUrl });
        setHeadshot(response.data.fileUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const venueData = {
      name: venue.name,
      addressLine1: venue.addressLine1,
      addressLine2: venue.addressLine2,
      country: Number(venue.country),
      state: Number(venue.state),
      city: Number(venue.city),
      zipCode: venue.zipCode,
      phone: venue.phone,
      email: venue.email,
      description: venue.description,
      isParent: true,
      parentId: Number(localStorage.getItem("venueId")),
      venueId: Number(localStorage.getItem("venueId"))
    }

    console.log("Data:", venueData)
    try {
      const response = await axios[isEditing ? "put" : "post"](
        isEditing ? `${import.meta.env.VITE_API_URL}venues/update` : `${import.meta.env.VITE_API_URL}venues`,
        venueData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(`Venue ${isEditing ? "updated" : "created"} successfully!`);
      }
    } catch (error) {
      console.error("Error submitting venue:", error);
    }
  };



  const handleDeleteHeadshot = () => {
    setHeadshot(null);
    setUploadedImageUrl("");
  };

  return (
    <>
      <p className="fw-bold modal-font">PROFILE</p>
      <hr />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <p className="profile-font">
        This information will be shared with entertainers who are booked for
        Pique.{" "}
      </p>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="row mb-2 profile-font">
            <div className="col-md-6 col-sm-12">
              <label className="fw-semibold">Venue Name*</label>
              <Input
                type="text"
                className="form-control profile-font"
                name="name"
                value={venue.name}
                onChange={handleChange}
                placeholder="Enter your venue Name"
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <label className="profile-font fw-semibold">Upload Images</label>
              <div className="custom-file-upload">
                <Input
                  type="file"
                  name="headshot"
                  accept="image/*"
                  id="fileInput"
                  className="d-none"
                  onChange={handleFileChange}
                />

                <label htmlFor="fileInput" className="form-control profile-font text-center d-flex align-items-center">
                  {headshot ? (
                    <>
                      <img
                        src={headshot}
                        alt="Uploaded preview"
                        className="media-image rounded"
                        style={{ height: "40px", width: "40px", objectFit: "cover", marginRight: "10px" }}
                      />
                      <span>Change Image</span>
                    </>
                  ) : (
                    <p className="profile-font text-secondary">
                      Drag & Drop or <span className="text-primary">Choose image</span> to upload
                    </p>
                  )}
                </label>

              </div>

              {uploadedImageUrl && (
                <button
                  type="button"
                  className="btn btn-link text-danger mt-2 profile-font"
                  onClick={handleDeleteHeadshot}
                >
                  <i className="fa-solid fa-trash-can"></i> Remove
                </button>
              )}

            </div>
          </div>

          <div className="row mb-2 profile-font">
            <div className="col-md-6 col-sm-12">
              <label className=" fw-semibold">Address Line 1*</label>
              <Input
                type="text"
                name="addressLine1"
                value={venue.addressLine1}
                onChange={handleChange}
                className="form-control profile-font"
                placeholder="Street Address, P.O.box,c/o"
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <label className="fw-semibold">Address Line 2*</label>
              <Input
                type="text"
                name="addressLine2"
                value={venue.addressLine2}
                onChange={handleChange}
                className="form-control profile-font"
                placeholder="Apartment,suite,unit,building,floor,etc."
              />
            </div>
          </div>

          <div className="row mb-3 profile-font">
            <div className="col-md-6 col-sm-12">
              <label className="fw-semibold">Country</label>
              <Select
                name="country"
                options={countries}
                value={venue.country || ""}
                onChange={handleChange}
                defaultOption="--Select Country--"
                className="form-control profile-font"
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <label className="fw-semibold">State</label>
              <Select
                name="state"
                options={states}
                value={venue.state || ""}
                onChange={handleChange}
                defaultOption="--Select State--"
                className="form-control profile-font"
              />
            </div>
          </div>

          <div className="row mb-2 profile-font">
            <div className="col-md-6 col-sm-12">
              <label className="fw-semibold">City</label>
              <Select
                name="city"
                options={cities}
                value={venue.city}
                onChange={handleChange}
                defaultOption="--Select City--"
                className="form-control profile-font"
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <label className="fw-semibold">ZIP/Postal Code</label>
              <Input
                name="zipCode"
                value={venue.zipCode}
                onChange={handleChange}
                className="form-control profile-font"
                placeholder="Enter zip code"
              />
            </div>
          </div>

          <div className="row profile-font mb-2">
            <div className="col-md-6 col-sm-12">
              <label className=" fw-semibold">Phone Number*</label>
              <Input
                type="text"
                name="phone"
                value={venue.phone}
                onChange={handleChange}
                className="form-control profile-font"
                placeholder="Enter phone number"
              />
            </div>
            <div className="col-md-6 col-sm-12">
              <label className=" fw-semibold">Email Address*</label>
              <Input
                type="email"
                name="email"
                value={venue.email}
                onChange={handleChange}
                className="form-control profile-font"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="row profile-font mb-2">
            <div className="col-md-12">
              <label className=" fw-semibold">Description*</label>
              <Input
                type="text"
                name="description"
                value={venue.description}
                onChange={handleChange}
                className="form-control profile-font"
                placeholder="Describe your venue....."
              />
            </div>
          </div>

          <Button className="btn venue-btn profile-font" type="submit" label="Submit" />
        </form>
      )}
    </>
  );
}
