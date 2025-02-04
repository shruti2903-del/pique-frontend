import React from "react";
import { Helmet } from "react-helmet-async";
import PiqueNavbar from "../components/PiqueComponents/PiqueNavbar";
import PiqueFooter from "../components/PiqueComponents/PiqueFooter";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Pique Entertainment</title>
        <meta name="description" content="Welcome to our website." />
      </Helmet>
      <PiqueNavbar />
      <div className="d-flex flex-column min-vh-100">
        <div className="container-fluid flex-grow-1">
          <div className="row mt-5">
            <h3 className="text-center mt-5">Home Page</h3>
          </div>
        </div>
        <PiqueFooter />
      </div>
    </>
  );
}
