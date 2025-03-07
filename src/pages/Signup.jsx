import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import Input from "../components/Input";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
    role: "venue",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword((prevState) => !prevState);
  };

  const handleRoleSelection = (role) => {
    setFormData((prevData) => ({
      ...prevData,
      role,
    }));
    if (role === "venue") {
      navigate("/signup/venue", { replace: true });
    } else if (role === "entertainer") {
      navigate("/signup/entertainer", { replace: true });
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: formData.name ? "" : "Name is required.",
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email
      )
        ? ""
        : "Please enter a valid email address.",
      password:
        formData.password.length >= 6
          ? ""
          : "Password must be at least 6 characters long.",
      cpassword:
        formData.password === formData.cpassword
          ? ""
          : "Passwords do not match.",
      phoneNumber: /^[0-9]{10}$/.test(formData.phoneNumber)
        ? ""
        : "Please enter a valid contact number.",
    };

    // setErrors(newErrors);

    // if (Object.values(newErrors).some((error) => error !== "")) {
    //   return;
    // }
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/register`,
        data
      );
      console.log("Registration Successful", response.data.user);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Registration Failed", error.response.data);
      } else if (error.request) {
        console.error("No response from server", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="sign-up-page">
      <Helmet>
        <title>
          {formData.role === "venue"
            ? "Sign Up as Venue"
            : "Sign Up as Entertainer"}
        </title>
        <meta
          name="description"
          content={`Register as a new  ${formData.role} and get started with our platform.`}
        />
      </Helmet>
      {/* <PiqueNavbar /> */}
      <div className="container min-vh-100">
        <div className="row mt-5">
          <div className="col-md-6 col-sm-12 d-none d-md-block">
            <div className="image-container">
            <img
            key={formData.role}
              src={
                formData.role === "venue"
                  ? "../../assets/pique/image/venueregister.png"
                  : "../../assets/pique/image/entertainerRegister.png"
              }
              className="image-fluid"
              style={{width:"90%", height:"90%"}}
              alt="signup-banner"
            />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row d-flex justify-content-center">
              <img
                src="../../assets/pique/image/logo.png"
                className="w-auto mt-3"
                style={{ height: "40px" }}
              />
            </div>
            <div className="row d-flex justify-content-around">
              <h3 className="text-center mt-4 fw-semibold">Sign Up</h3>
              <div className="col-md-10 col-sm-12 p-3 ">
                <form onSubmit={handleSubmit}>
                  <div className="role-container w-100 p-2">
                    <div className="role-selection-box w-100">
                      <div
                        className={`role-indicator ${
                          formData.role === "venue" ? "left" : "right"
                        }`}
                      ></div>
                      <Button
                        className={`role-btn ${
                          formData.role === "venue" ? "active" : ""
                        }`}
                        onClick={() => handleRoleSelection("venue")}
                      >
                        <p className="fw-light fs-6">Sign Up as Venue</p>
                      </Button>
                      <Button
                        className={`role-btn ${
                          formData.role === "entertainer" ? "active" : ""
                        }`}
                        onClick={() => handleRoleSelection("entertainer")}
                      >
                        <p className="fw-light fs-6">Sign Up as Entertainer</p>
                      </Button>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-6">
                      <label className="text-start fw-semibold">Name*</label>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        className="input-line text-dark"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      {errors.name && (
                        <p className="text-danger text-start">{errors.name}</p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="text-start fw-semibold">
                        Contact Number*
                      </label>
                      <div className="contact-input">
                        <select className="country-code">
                          <option value="+1" className="us-option">
                          US +1
                          </option>
                          <option value="+91">IN +91</option>
                        </select>
                        <Input
                          type="text"
                          placeholder="Enter Number"
                          className="input-line text-dark"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-danger text-start">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <label className="text-start fw-semibold">Email*</label>

                    <Input
                      type="email"
                      placeholder="Enter Email address"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input-line text-dark"
                    />
                    {errors.email && (
                      <p className="text-danger text-start">{errors.email}</p>
                    )}
                  </div>

                  <div className="row">
                    <label className="text-start fw-semibold">
                      Create Password*
                    </label>

                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input-line text-dark"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                    />
                    {errors.password && (
                      <p className="text-danger text-start">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="row">
                    <label className="text-start fw-semibold">
                      Confirm Password*
                    </label>

                    <Input
                      type={showCPassword ? "text" : "password"}
                      name="cpassword"
                      className="input-line text-dark"
                      placeholder="Re-enter Password"
                      value={formData.cpassword}
                      onChange={(e) =>
                        setFormData({ ...formData, cpassword: e.target.value })
                      }
                      showPassword={showCPassword}
                      togglePasswordVisibility={toggleCPasswordVisibility}
                    />
                    {errors.cpassword && (
                      <p className="text-danger text-start">
                        {errors.cpassword}
                      </p>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                  <div className="row">
                      <div className="col-1">
                      <input type="checkbox" id="terms&Services"  className="me-1" />
                        </div>
                        <div className="col-11">
                        <label htmlFor="terms&Services" className="fw-light"><p className="termsServices">By entering your information here, you affirm you have read and agree to our 
                      <Link to="">Terms of Services</Link>and <Link to="">Privacy Policy</Link></p>
                      </label>
                        </div>
                     
                    </div>
</div>
                  <Button
                    type="submit"
                    className=" btn-primary text-white w-100 sign-in-btn"
                    label="Signup"
                  />
                </form>

                <hr />
                <p className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary fw-semibold"
                  >
                    Sign In Now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <PiqueFooter /> */}
    </div>
  );
};

export default Signup;
