import React from "react";
import { Helmet } from "react-helmet-async";
import PiqueNavbar from "../components/PiqueComponents/PiqueNavbar";
import PiqueFooter from "../components/PiqueComponents/PiqueFooter";
import EntertainerVenueSection from "../components/HomePage.jsx/EntertainerVenueSection";
import BannerSlider from "../components/HomePage.jsx/BannerSlider";
import HowItWorks from "../components/HomePage.jsx/HowItWorks";
import PerfectFit from "../components/HomePage.jsx/PerfectFit";
import ClientWrapper from "../components/HomePage.jsx/ClientWrapper";
import ServiceWrapper from "../components/HomePage.jsx/ServiceWrapper";
import RatedReviewed from "../components/HomePage.jsx/RatedReviewed";
import Testimonial from "../components/HomePage.jsx/Testimonial";
import ReadyWrap from "../components/HomePage.jsx/ReadyWrap";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Pique Entertainment</title>
        <meta name="description" content="Welcome to our website." />
      </Helmet>
      <PiqueNavbar />
      <div className="container-fluid">
      <EntertainerVenueSection />
      <BannerSlider />
      <HowItWorks />
      <PerfectFit />
      <ClientWrapper />
      <ServiceWrapper />
      <RatedReviewed />
<Testimonial/>
<ReadyWrap/>
</div>
      <PiqueFooter />
    </>
  );
}
