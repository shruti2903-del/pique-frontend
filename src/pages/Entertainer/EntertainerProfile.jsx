import React, { useState, useEffect } from "react";
import EnterDashSidebar from "../../components/Entertainer/EnterDashSidebar";
import EnterDashNavbar from "../../components/Entertainer/EnterDashNavbar";
import { Helmet } from "react-helmet-async";
import Input from "../../components/Input";
import Select from "../../components/Select";
import RadioButton from "../../components/RadioButton";
import Button from "../../components/Button";
import axios from "axios";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    bio: "",
    phone1: "",
    phone2: "",
    performanceRole: "",
    availability: "",
    headshotUrl: "",
    images: [],
    videos: [],
    pricePerEvent: "",
    // mediaUrl: [],
    socialLinks: "",
    vaccinated: "",
    status: "pending",
    userId: localStorage.getItem("userId"),
  });

  const [errors, setErrors] = useState({});
  const [headshotUrl, setHeadshotUrl] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [tempLink, setTempLink] = useState("");
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   const fetchEntertainerData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_API_URL}entertainers`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       console.log(response.data[0]);
  //       if (response.status === 200) {
  //         const data = response.data[0];
  //         setFormData({
  //           name: data.name || "",
  //           type: data.type || "",
  //           bio: data.bio || "",
  //           phone1: data.phone1 || "",
  //           phone2: data.phone2 || "",
  //           performanceRole: data.performanceRole || "",
  //           availability: data.availability || "",
  //           headshotUrl: data.headshotUrl || "",
  //           pricePerEvent: data.pricePerEvent || "",
  //           mediaUrl: data.mediaUrl || [],
  //           socialLinks: data.socialLinks || "",
  //           vaccinated: data.vaccinated || "",
  //           status: data.status || "pending",
  //           userId: data.userId || localStorage.getItem("userId") || "",
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching entertainer data:", error);
  //     }
  //   };

  //   fetchEntertainerData();
  // }, []);

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
    setHeadshotUrl(null);
    setFormData((prevData) => ({ ...prevData, headshotUrl: "" }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);

    if (type === "headshotUrl") {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setHeadshotUrl(file);
      setFormData((prev) => ({ ...prev, headshotUrl: fileUrl }));
    }

    if (type === "mediaUrl") {
      const imageFiles = files.filter((file) => file.type.startsWith("image"));
      const videoFiles = files.filter((file) => file.type.startsWith("video"));

      const imageObjects = imageFiles.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type,
      }));

      const videoObjects = videoFiles.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type,
      }));

      setImages((prev) => {
        const updatedImages = [...prev, ...imageObjects];
        setFormData((prevData) => ({ ...prevData, images: updatedImages }));
        return updatedImages;
      });

      setVideos((prev) => {
        const updatedVideos = [...prev, ...videoObjects];
        setFormData((prevData) => ({ ...prevData, videos: updatedVideos }));
        return updatedVideos;
      });
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
  
   console.log("Entertainer form",formData)
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
  
    try {
      const mediaFormData = new FormData();
      images.forEach((image, index) => mediaFormData.append(`images_${index}`, image.file));
      videos.forEach((video, index) => mediaFormData.append(`videos_${index}`, video.file));
  
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
  console.log("Media",mediaUploadResponse)
      const { images: uploadedImages=[], videos: uploadedVideos=[] } = mediaUploadResponse.data;
  
      const mediaUrl = [...uploadedImages, ...uploadedVideos];
  
      const entertainerPayload = {
        ...formData,  
        headshotUrl: formData.headshotUrl, 
        mediaUrl: mediaUrl,
      };
  
      const entertainerResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}entertainers`,
        entertainerPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  console.log("Form",entertainerResponse)
      if (entertainerResponse.status === 200 || entertainerResponse.status === 201) {
        alert("Entertainer profile created successfully!");
      }
    } catch (error) {
      console.error("Error creating entertainer profile:", error);
      alert("Failed to create entertainer profile. Please try again.");
    }
  };
  
  

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="bio" content="Add your entertainer details." />
      </Helmet>
      <div className="container-xxl position-relative bg-white d-flex p-0">
        <EnterDashSidebar />
        <div className="content">
          <EnterDashNavbar />
          <div className="row">
            <div className="col-md-12 mt-4 mb-4">
              <h2 className="text-secondary text-center">Profile</h2>
            </div>
            <div className="row justify-content-center mb-4">
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                  <div className="card shadow-lg col-11 border-0 rounded p-4">
                    <div className="card-body">
                      <h5 className="text-start text-primary mt-2">
                        Media Uploads
                      </h5>
                      <hr className="mb-4" />

                      <div className="row mb-3">
                        <div className="col-md-12 col-sm-12">
                          <label className="fw-medium">
                            Headshot Profile Pic
                          </label>
                          <Input
                            type="file"
                            name="headshotUrl"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "headshotUrl")}
                          />
                          {headshotUrl && (
                            <div className="position-relative">
                              <img
                                src={URL.createObjectURL(headshotUrl)}
                                alt="Headshot preview"
                                className="media-image h-auto rounded"
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
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-12 col-sm-12">
                          <label className="fw-medium">Image Upload</label>
                          <Input
                            type="file"
                            name="mediaUrl"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileChange(e, "mediaUrl")}
                          />
                          <div className="d-flex flex-wrap gap-3">
                            {images.map((file, index) => (
                              <div
                                key={index}
                                className="position-relative p-2"
                              >
                                <img
                                  src={file.url}
                                  alt="Uploaded image"
                                  className="media-image h-auto rounded"
                                />
                                <button
                                  type="button"
                                  className="btn btn-link position-absolute"
                                  onClick={() => handleDeleteImage(index)}
                                >
                                  <i className="fa-solid fa-trash-can text-danger"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-12 col-sm-12">
                          <label className="fw-medium">Video Upload</label>
                          <Input
                            type="file"
                            name="mediaUrl"
                            accept="video/*"
                            multiple
                            onChange={(e) => handleFileChange(e, "mediaUrl")}
                          />
                          <div className="d-flex flex-wrap gap-3">
                            {videos.map((file, index) => (
                              <div
                                key={index}
                                className="position-relative p-2"
                              >
                                <video
                                  src={file.url}
                                  controls
                                  className="media-video h-auto w-25 rounded"
                                />
                                <button
                                  type="button"
                                  className="btn btn-link position-absolute"
                                  onClick={() => handleDeleteVideo(index)}
                                >
                                  <i className="fa-solid fa-trash-can text-danger"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* <div className="row ">
                        <div className="col d-flex justify-content-center">
                          <Button
                            type="submit"
                            className="btn-primary w-25 fw-bold"
                            label="Upload"
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

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
