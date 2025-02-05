import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PiqueNavbar from "../components/PiqueComponents/PiqueNavbar";
import PiqueFooter from "../components/PiqueComponents/PiqueFooter";

const Login = ({setIsLoggedIn,setRole}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/login`,
        formData
      );
      console.log("Login successful", response.data);
      const token = response.data.access_token;
      const role = response.data.role;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("status", response.data.status);

      setIsLoggedIn(true);
      setRole(role); 
      const status = localStorage.getItem("status");
      // if (response.data.role === "venue" && status === "pending") {
      //   navigate("/statusverification");
      // } else if (response.data.role === "venue" && status === "active") {
      //   navigate("/loggedin/venuedash");
      // }else if (response.data.role === "entertainer" && status === "pending"){
      //   navigate("/statusverification");
      // }else if (response.data.role === "entertainer" && status === "active") {
      //   navigate("/loggedin/entertainerdash");
      // }else{
      //   navigate("/error");
      // }

      if(response.data.role === "venue"){
        navigate("/user/")
      }else if(response.data.role === "entertainer"){
        navigate("/user/")
      }else{
        navigate("/error");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <PiqueNavbar/>
      <div className="container min-vh-100 ">
        <div className="row text-center d-flex justify-content-center">
          <h1 className="fw-bold mt-3">Login</h1>
        </div>
        <div className="row d-flex justify-content-around mt-3">
          <div className="col-md-6 col-sm-12 d-none d-md-block">
            <video
              src="assets/images/Login.mp4"
              className="img-fluid"
              style={{height:"80%"}}
              autoPlay
            loop
            muted
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
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                    />
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <Button
                        type="submit"
                        className="btn-primary w-100 fw-bold"
                        label="Login"
                      />
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
      <PiqueFooter/>
    </>
  );
};

export default Login;
