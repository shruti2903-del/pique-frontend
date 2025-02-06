import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import Input from "../components/Input";
import PiqueNavbar from "../components/PiqueComponents/PiqueNavbar";
import PiqueFooter from "../components/PiqueComponents/PiqueFooter";

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

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
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
    <>
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
      <PiqueNavbar />
      <div className="container min-vh-100 ">
        <div className="row d-flex">
          <h1 className="fw-bold mt-5 text-center"></h1>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 col-sm-12 d-none d-md-block">
            <img
              src="../assets/images/registeruser.avif"
              className="img-fluid"
              style={{ height: "80%" }}
              alt="user"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row d-flex justify-content-around">
              <div className="col-md-10 col-sm-12 my-4">
                <form onSubmit={handleSubmit}>
                  <div className="btn-group mb-3 w-100 shadow">
                    <Button
                      type="button"
                      className={`btn-outline-primary ${
                        formData.role === "venue" ? "active" : ""
                      }`}
                      label="Sign Up as Venue"
                      onClick={() => handleRoleSelection("venue")}
                    />

                    <Button
                      type="button"
                      className={`btn-outline-primary ${
                        formData.role === "entertainer" ? "active" : ""
                      }`}
                      label="Sign Up as Entertainer"
                      onClick={() => handleRoleSelection("entertainer")}
                    />
                  </div>
                  <div className="row">
                    <label className="text-start fw-bold">Name</label>

                    <Input
                      type="text"
                      placeholder="Enter your name"
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

                  <div className="row">
                    <label className="text-start fw-bold">Contact Number</label>

                    <Input
                      type="text"
                      placeholder="Enter your Contact number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                    {errors.phoneNumber && (
                      <p className="text-danger text-start">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  <div className="row">
                    <label className="text-start fw-bold">Email</label>

                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {errors.email && (
                      <p className="text-danger text-start">{errors.email}</p>
                    )}
                  </div>

                  <div className="row">
                    <label className="text-start fw-bold">
                      Create Password
                    </label>

                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create your password"
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
                    <label className="text-start fw-bold">
                      Confirm Password
                    </label>

                    <Input
                      type={showCPassword ? "text" : "password"}
                      name="cpassword"
                      placeholder="Confirm your password"
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

                  <Button
                    type="submit"
                    className=" btn-primary text-white w-100"
                    label="Signup"
                  />
                </form>

                <hr />
                <p className="text-center">
                  Already have a User Account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-none text-primary fw-semibold"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PiqueFooter />
    </>
  );
};

export default Signup;
