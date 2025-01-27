import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "../components/Input";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}auth/login`, formData);
      console.log("Login successful", response.data);
      localStorage.setItem("token", response.data.access_token);
      const token = localStorage.getItem("token");

      const url = `${import.meta.env.VITE_API_URL}auth/profile`
      console.log(url)

      const profileResponse = await axios.post(url, {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

      console.log(profileResponse.data);
      localStorage.setItem("profile", JSON.stringify(profileResponse.data)); 
      localStorage.setItem("userId", profileResponse.data.userId)

      if (profileResponse.data.role === "venue") {
        navigate("/venuedash");
      } else if (profileResponse.data.role === "entertainer") {
        navigate("/entertainerdash");
      } else {
        console.log("Unknown role");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Login to your account to access personalized features and services."
        />
      </Helmet>
      <Navbar />
      <div className="container min-vh-100 mt-5">
        <div className="row text-center d-flex justify-content-center">
          <h1 className="fw-bold mt-3">Login</h1>
        </div>
        <div className="row d-flex justify-content-around mt-3">
          <div className="col-md-6 col-sm-12 d-none d-md-block">
            <img
              src="/src/assets/images/loginuser.avif"
              className="img-fluid h-75 w-100"
              alt="login"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row d-flex justify-content-center">
              <div className="col-md-10 col-sm-12 p-3 mt-5">
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row mt-3">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row">
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <Button type="submit" className="btn-primary w-100 fw-bold" label="Login" />
                    </div>
                  </div>
                </form>
                <hr />
                <p className="text-center">
                  New to Pique?{" "}
                  <Link
                    to="/signup/venue"
                    className="text-decoration-none text-primary fw-semibold"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
