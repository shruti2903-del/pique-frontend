import React from "react";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";

export default function Home() {
    return (
        <>
        <Helmet>
                <title>Pique Entertainment</title>
                <meta
                  name="description"
                  content="Welcome to our website."
                />
              </Helmet>
              <Navbar/>
            <div className="container-fluid mt-5">
              <div className="row">
              <h3 className="mt-2 text-center">Home Page</h3>

              </div>

            </div>
        </>
    );
}
