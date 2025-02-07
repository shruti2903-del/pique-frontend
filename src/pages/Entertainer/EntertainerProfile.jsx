import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import RadioButton from "../../components/RadioButton";
import Button from "../../components/Button";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import DashLayoutEnter from "../../components/Entertainer/DashLayoutEnter";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function Profile() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    name: "",
    category: null,
    specific_category: "",
    bio: "",
    phone1: "",
    phone2: "",
    performanceRole: "",
    availability: "",
    pricePerEvent: "",
    socialLinks: "",
    vaccinated: "",
    status: "active",
    userId: userId,
    images: [],
    videos: [],
    headshot: null,
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [headshot, setHeadshot] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [tempLink, setTempLink] = useState("");

  const performanceRole = [
    { value: "soloist", label: "Soloist" },
    { value: "duo", label: "Duo" },
    { value: "trio", label: "Trio" },
  ];

  const options = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}entertainers/categories/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Categories:", response.data);

        if (response.data && Array.isArray(response.data.categories)) {
          setCategories(
            response.data.categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))
          );
        } else {
          console.error(
            "Unexpected API response format for categories:",
            response.data
          );
          toast.error("Failed to load categories. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchEntertainer = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}entertainers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data[0].id)
        localStorage.setItem('entertainerId', response.data[0].id)
        if (response.data?.length > 0) {
          setFormData(response.data[0]);
          setIsEditing(true);
        }
      } catch (error) {
        console.error("Error fetching entertainer data:", error);
        toast.error("Failed to fetch entertainer data.");
      }
    };

    fetchCategories();
    fetchEntertainer();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTempLink(e.target.value);
  };

  const handleCategoryChange = async (selectedValue) => {
    console.log("Selected Value", selectedValue);

    setFormData((prev) => ({
      ...prev,
      category: selectedValue,
      specific_category: "",
    }));

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}entertainers/categories/subcategories?id=${selectedValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Categories from API:", response.data.categories);

      if (response.data && Array.isArray(response.data.categories)) {
        const filteredSubcategories = response.data.categories.filter(
          (sub) => sub.parentId === selectedValue
        );

        console.log("Filtered Subcategories:", filteredSubcategories);

        setSubcategories(
          filteredSubcategories.map((sub) => ({
            value: sub.id,
            label: sub.name,
          }))
        );
      } else {
        console.error("No subcategory found:", response.data);
        setSubcategories([]);
        toast.error("No subcategories found for the selected category");
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]);
      toast.error("Failed to fetch subcategories.");
    }
  };


  const handleSubCategoryChange = (selectedValue) => {
    setFormData((prev) => ({
      ...prev,
      specific_category: selectedValue,
    }));
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

    if (type === "headshot") {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setHeadshot(file);
      setFormData((prev) => ({ ...prev, headshot: fileUrl }));
    }

    if (type === "images") {
      setImages((prev) => [...prev, ...files]);
    } else if (type === "videos") {
      setVideos((prev) => [...prev, ...files]);
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

    if (!formData.availability)
      newErrors.availability = "Availability is required";

    if (!formData.vaccinated)
      newErrors.vaccinated = "Vaccination status is required";

    return newErrors;
  };

  const mediaUpload = async (e) => {
    e.preventDefault();
    try {
      const mediaFormData = new FormData();

      if (headshot) {
        mediaFormData.append("headshot", headshot);
      }

      images.forEach((image) => {
        mediaFormData.append("images", image);
      });

      videos.forEach((video) => {
        mediaFormData.append("videos", video);
      });

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

      console.log("Media upload response:", mediaUploadResponse);
      if (mediaUploadResponse.status === 201) {
        const { headshotUrl, imagesUrls, videosUrls } =
          mediaUploadResponse.data;

        setFormData((prev) => ({
          ...prev,
          headshot: headshotUrl || prev.headshot,
          images: imagesUrls || prev.images,
          videos: videosUrls || prev.videos,
        }));

        toast.success("Media uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      toast.error("Failed to upload media. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const userData = {};
    const entertainerData = {
      name: formData.name,
      category: formData.category,
      specific_category: formData.specific_category,
      bio: formData.bio,
      phone1: formData.phone1,
      phone2: formData.phone2,
      performanceRole: formData.performanceRole,
      availability: formData.availability,
      vaccinated: formData.vaccinated,
      pricePerEvent: formData.pricePerEvent,
      socialLinks: formData.socialLinks,
      status: localStorage.getItem("status"),
    };
  
    const entertainerId = localStorage.getItem("entertainerId");
    if (!entertainerId) {
      toast.error("Entertainer ID is missing.");
      return;
    }
  
    try {
      if (isEditing) {
        console.log("Updating entertainer with ID:", entertainerId);
        const updateResponse = await axios.put(
          `${import.meta.env.VITE_API_URL}entertainers/${entertainerId}`,
          entertainerData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("Update response:", updateResponse);
        if (updateResponse.status === 200) {
          toast.success("Entertainer updated successfully!");
        } else {
          toast.error("Failed to update entertainer.");
        }
      } else {
        console.log("Creating new entertainer profile");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}entertainers`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 201 || response.status === "success") {
          toast.success("Entertainer profile created successfully!");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error.response || error.message);
      toast.error("Failed to submit the form.");
    }
  };
  
  return (
    <>
      <DashLayoutEnter
        title="Profile"
        description="View and manage your profile"
      >
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">
          <Toaster position="top-center" reverseOrder={false} />
          <div className="row mt-5">
            <div className="col-md-12">
              <h2 className="text-secondary text-center">Profile</h2>
            </div>
            <div className="row justify-content-center mb-4">
              <form onSubmit={mediaUpload}>
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
                      </div>

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
                                    src={URL.createObjectURL(file)}
                                    controls
                                    className="media-video rounded"
                                    style={{ height: "90px", width: "90px" }}
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
                          )}
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col d-flex justify-content-center">
                          <Button
                            type="submit"
                            className="btn-primary w-25 fw-bold"
                            label="Upload Media"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <form onSubmit={handleSubmit} className="mt-5">
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
                          <label className="fw-medium">
                            Entertainer Main Category
                          </label>
                          <Select
                            options={categories}
                            value={formData.category || ''}
                            onChange={handleCategoryChange}
                            placeholder="Select Category"
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="fw-medium">
                            Entertainer Sub Category
                          </label>
                          <Select
                            options={subcategories}
                            value={formData.specific_category || ''}
                            onChange={handleSubCategoryChange}
                            placeholder="Select Subcategory"
                            isDisabled={!formData.category}
                          />

                        </div>
                      </div>

                      <div className="row mb-3">
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
                      </div>

                      <div className="row mb-3">
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
                      </div>
                      <div className="row mb-3">
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
                            label={isEditing ? "Update" : "Submit"}
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
        <PiqueFooter />
      </DashLayoutEnter>
    </>
  );
}
