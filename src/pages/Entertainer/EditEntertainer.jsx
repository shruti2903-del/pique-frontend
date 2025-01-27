import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import EnterDashSidebar from "../../components/Entertainer/EnterDashSidebar";
import EnterDashNavbar from "../../components/Entertainer/EnterDashNavbar";
import Input from "../../components/Input";
import Select from "../../components/Select";
import RadioButton from "../../components/RadioButton";
import Button from "../../components/Button";

export default function EditEntertainer() {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        bio: "",
        phone1: "",
        phone2: "",
        performanceRole: "",
        availability: "",
        headshotUrl: "",
        pricePerEvent: "",
        mediaUrl: "",
        socialLinks: "",
        vaccinated: "",
        status: "pending",
        userId: localStorage.getItem("userId"),
      });
    
      const [errors, setErrors] = useState({});
      const [headshotUrl, setHeadshotUrl] = useState(null);
      const [mediaUrl, setmediaUrl] = useState([]);
      const [tempLink, setTempLink] = useState("");
    
      const types = [
        { value: "Musicians/Bands", label: "Musicians/Bands" },
        { value: "Dancers", label: "Dancers" },
        { value: "Magicians", label: "Magicians" },
        { value: "Theatre Performers", label: "Theatre Performers" },
        { value: "Speakers/Hosts", label: "Speakers/Hosts" },
      ];
    
      const performanceRole = [
        { value: "soloist", label: "Soloist" },
        { value: "duo", label: "Duo" },
        { value: "trio", label: "Trio" },
      ];
    
      const options = [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ];
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTempLink(e.target.value);
      };
    
      const handleDeleteHeadshot = () => {
        setHeadshotUrl(null);
      };
    
      const handleDeleteMedia = (index) => {
        setmediaUrl((prev) => prev.filter((_, i) => i !== index));
      };
    
      const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        if (type === "headshotUrl") {
          setHeadshotUrl(files[0]);
        } else if (type === "mediaUrl") {
          setmediaUrl((prev) => [...prev, ...files]);
        }
      };
    
      const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Entertainer Name is required";
    
        if (!formData.type) newErrors.type = "Entertainer Type is required";
    
        if (!formData.phone1) newErrors.phone1 = "Phone Number 1 is required";
        else if (!/^\d+$/.test(formData.phone1))
          newErrors.phone1 = "Phone Number 1 must be digits only";
    
        if (!formData.performanceRole)
          newErrors.performanceRole = "Performance Role is required";
    
        if (!formData.headshotUrl)
          newErrors.headshotUrl = "Headshot URL is required";
    
        if (!formData.mediaUrl) newErrors.mediaUrl = "Media URL is required";
    
        if (!formData.availability)
          newErrors.availability = "Availability is required";
    
        if (!formData.vaccinated)
          newErrors.vaccinated = "Vaccination status is required";
    
        return newErrors;
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      }
    
  return (
    <>
      <Helmet>
        <title>Edit Profile</title>
        <meta
          name="description"
          content="Edit your profile by necessary informations."
        />
      </Helmet>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <EnterDashSidebar />

        {/* <!-- Content Start --> */}
        <div className="content">
          {/* <!-- Navbar Start --> */}
          <EnterDashNavbar />
          {/* <!-- Navbar End --> */}
          <div className="row">
            <div className="col-md-12 mt-4">
              <h2 className="text-secondary text-center">Edit Profile</h2>
            </div>
            <div className="row justify-content-center mb-4">
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                  <div className="card shadow-lg col-11 border-0 rounded p-4">
                    <div className="card-body">
                      <h5 className="text-start text-primary">
                        Entertainer Details
                      </h5>
                      <hr className="mb-4" />
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="fw-medium">Entertainer Name</label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="Enter your Entertainer Name"
                            onChange={handleInputChange}
                          />
                          {errors.name && (
                            <div className="text-danger">{errors.name}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-medium">Entertainer Type</label>
                          <Select
                            name="type"
                            options={types}
                            defaultOption="--Select Category--"
                            value={formData.type}
                            onChange={handleInputChange}
                          />
                          {errors.type && (
                            <div className="text-danger">{errors.type}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-medium">Bio</label>
                          <textarea
                            className="form-control"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Describe your business"
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="fw-medium">Contact Number 1</label>
                          <Input
                            type="text"
                            name="phone1"
                            value={formData.phone1}
                            placeholder="Enter your contact number."
                            onChange={handleInputChange}
                          />
                          {errors.phone1 && (
                            <div className="text-danger">{errors.phone1}</div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-medium">Contact Number 2</label>
                          <Input
                            type="text"
                            name="phone2"
                            value={formData.phone2}
                            placeholder="Enter your another contact number."
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="fw-medium">Performance Role</label>
                          <Select
                            name="performanceRole"
                            options={performanceRole}
                            defaultOption="--Select Role--"
                            value={formData.performanceRole}
                            onChange={handleInputChange}
                          />
                          {errors.performanceRole && (
                            <div className="text-danger">
                              {errors.performanceRole}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-4">
                          <label className="fw-medium">Availability?</label>
                          <RadioButton
                            name="availability"
                            options={options}
                            value={formData.availability}
                            onChange={handleInputChange}
                          />
                          {errors.availability && (
                            <div className="text-danger">
                              {errors.availability}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4">
                          <label className="fw-medium">Price Per Event</label>
                          <Input
                            type="number"
                            name="pricePerEvent"
                            value={formData.pricePerEvent}
                            placeholder="Rs."
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="fw-medium">Vaccinated?</label>
                          <RadioButton
                            name="vaccinated"
                            options={options}
                            value={formData.vaccinated}
                            onChange={handleInputChange}
                          />
                          {errors.vaccinated && (
                            <div className="text-danger">
                              {errors.vaccinated}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="card shadow-lg col-11 border-0 rounded p-4">
                    <div className="card-body">
                      <h5 className="text-start text-primary mt-2">Media</h5>
                      <hr className="mb-4" />
                      <div className="row mb-3">
                        <div className="col-md-12 col-sm-12">
                          <label className="fw-medium">
                            Headshot Profile Pic
                          </label>
                          <Input
                            type="file"
                            name="headshotUrl"
                            value={formData.headshotUrl}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "headshotUrl")}
                          />
                          {errors.headshotUrl && (
                            <div className="text-danger">
                              {errors.headshotUrl}
                            </div>
                          )}
                          {headshotUrl && (
                            <div className="position-relative">
                              <img
                                src={URL.createObjectURL(headshotUrl)}
                                alt="Headshot preview"
                                className="media-image  h-auto rounded"
                              />
                              <button
                                type="button"
                                className="btn btn-link position-absolute "
                                onClick={handleDeleteHeadshot}
                              >
                                <i className="fa-solid fa-trash-can text-danger"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12 col-sm-12">
                          <label className="fw-medium">Media Upload</label>
                          <Input
                            type="file"
                            name="mediaUrl"
                            value={formData.mediaUrl}
                            accept="image/*,video/*"
                            onChange={(e) => handleFileChange(e, "mediaUrl")}
                          />
                          {errors.mediaUrl && (
                            <div className="text-danger">{errors.mediaUrl}</div>
                          )}
                          <div className="d-flex flex-wrap gap-3">
                            {mediaUrl.map((file, index) => (
                              <div
                                key={index}
                                className="position-relative p-2"
                              >
                                {file.type.startsWith("image") ? (
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt="Uploaded preview"
                                    className="media-image h-auto rounded"
                                  />
                                ) : (
                                  <video
                                    src={URL.createObjectURL(file)}
                                    controls
                                    className="media-video h-auto w-25 rounded"
                                  />
                                )}
                                <button
                                  type="button"
                                  className="btn btn-link position-absolute "
                                  onClick={() => handleDeleteMedia(index)}
                                >
                                  <i className="fa-solid fa-trash-can text-danger"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="card shadow-lg col-11 border-0 rounded p-4">
                    <div className="card-body">
                      <h5 className="text-start text-primary mt-2">Links</h5>
                      <hr className="mb-4" />
                      <div className="row mb-3">
                        <label className="fw-medium">Social Media Link</label>
                        <div className="col-md-6 col-sm-12">
                          <Input
                            type="text"
                            name="socialLinks"
                            value={formData.socialLinks}
                            placeholder="Enter your Social Media Link"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col d-flex justify-content-center">
                          <Button
                            type="submit"
                            className="btn-primary w-25 fw-bold"
                            label="Submit"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
