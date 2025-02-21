import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import VenueDash from "../pages/Venue/VenueDash";
import EntertainerDash from "../pages/Entertainer/EntertainerDash";
import AllEntertainer from "../pages/Venue/AllEntertainer";
import EntertainerProfile from "../pages/Entertainer/EntertainerProfile";
import BookingCalendar from "../pages/Entertainer/BookingCalendar";
import VenueProfile from "../pages/Venue/VenueProfile";
import VenueCalendar from "../pages/Venue/VenueCalendar";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import AllBookings from "../pages/Venue/AllBookings";
import BookingRequest from "../pages/Entertainer/BookingRequest";
import AddVenue from "../pages/Venue/AddVenue";
import StatusVerification from "../pages/StatusVerification";
import AllVenues from "../pages/Venue/AllVenues";
import ErrorPage from "../pages/ErrorPage";
import EntertainerDetails from "../pages/Venue/EntertainerDetails";
import BookingPage from "../pages/Venue/BookingPage";
import EditVenue from "../pages/Venue/EditVenue";
import Login from '../pages/Login';


export default function Router() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route path="/signup/venue" element={<Signup />} />
      <Route path="/signup/entertainer" element={<Signup />} />
      <Route path="/statusverification" element={<StatusVerification />} />
      <Route path="/error" element={<ErrorPage />} />

      {/* protected routes */}
      <Route element={<ProtectedRoute allowedRoles={["venue"]} />}>
        <Route path="/user" element={<VenueDash />} />
        <Route path="/user/profile" element={<VenueProfile />} />
        <Route path="/user/entertainers" element={<AllEntertainer />} />
        <Route path="/user/bookings" element={<AllBookings />} />
        <Route path="/user/calendar" element={<VenueCalendar />} />
        <Route path="/user/add" element={<AddVenue />} />
        <Route path="/user/edit" element={<EditVenue />} />
        <Route path="/user/venues" element={<AllVenues />} />
        <Route path="/user/entertainerDetails" element={<EntertainerDetails />} />
        <Route path="/user/bookingPage" element={<BookingPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["entertainer"]} />}>
        <Route path="/user" element={<EntertainerDash />} />
        <Route path="/user/profile" element={<EntertainerProfile />} />
        <Route path="/user/bookingrequest" element={<BookingRequest />} />
        <Route path="/user/calendar" element={<BookingCalendar />} />
      </Route>
    </Routes>
  )
}
