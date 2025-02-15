import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import VenueDash from "./pages/Venue/VenueDash";
import EntertainerDash from "./pages/Entertainer/EntertainerDash";
import AllEntertainer from "./pages/Venue/AllEntertainer";
import EntertainerProfile from "./pages/Entertainer/EntertainerProfile";
import BookingCalendar from "./pages/Entertainer/BookingCalendar";
import VenueProfile from "./pages/Venue/VenueProfile";
import VenueCalendar from "./pages/Venue/VenueCalendar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";
import AllBookings from "./pages/Venue/AllBookings";
import BookingRequest from "./pages/Entertainer/BookingRequest";
import AddVenue from "./pages/Venue/AddVenue";
import StatusVerification from "./pages/StatusVerification";
import AllVenues from "./pages/Venue/AllVenues";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (token && storedRole) {
      setIsLoggedIn(true);
      setRole(storedRole);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log(isLoggedIn, role);
  return (
    <>
      <HelmetProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />}
          />
          <Route path="/signup/venue" element={<Signup />} />
          <Route path="/signup/entertainer" element={<Signup />} />
          <Route path="/statusverification" element={<StatusVerification />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* protected routes */}
          <Route
            path="/user/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                {role === "venue" ? (
                  <Routes>
                    <Route path="/" element={<VenueDash />} />
                    <Route path="profile" element={<VenueProfile />} />
                    <Route path="entertainers" element={<AllEntertainer />} />
                    <Route path="bookings" element={<AllBookings />} />
                    <Route path="calendar" element={<VenueCalendar />} />
                    <Route path="add" element={<AddVenue />} />
                    <Route path="allvenues" element={<AllVenues />} />
                  </Routes>
                ) : role === "entertainer" ? (
                  <Routes>
                    <Route path="/" element={<EntertainerDash />} />
                    <Route path="profile" element={<EntertainerProfile />} />
                    <Route path="bookingrequest" element={<BookingRequest />} />
                    <Route path="calendar" element={<BookingCalendar />} />
                  </Routes>
                ) : null}
              </ProtectedRoute>
            }
          />
        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
