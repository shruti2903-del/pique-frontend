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
import BookingRequests from "./pages/Entertainer/BookingRequests";
import EditEntertainer from "./pages/Entertainer/EditEntertainer";
import BookingCalendar from "./pages/Entertainer/BookingCalendar";
import VenueProfile from "./pages/Venue/VenueProfile";
import VenueCalendar from "./pages/Venue/VenueCalendar";
import UpdateVenue from "./pages/Venue/UpdateVenue";


function App() {
  return (
    <>
      <HelmetProvider>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/venue" element={<Signup />} />
          <Route path="/signup/entertainer" element={<Signup />} />
          
          <Route path="/venueprofile" element={<VenueProfile/>} />
          <Route path="/venuedash" element={<VenueDash />} />
          <Route path="/allentertainer" element={<AllEntertainer />} />
          <Route path="/venuecalendar" element={<VenueCalendar />} />
          <Route path="/updatevenue" element={<UpdateVenue />} />


          
          <Route path="/entertainerdash" element={<EntertainerDash/>}/>
          <Route path="/entertainerprofile" element={<EntertainerProfile/>}/>
          <Route path="/bookingrequests" element={<BookingRequests/>}/>
          <Route path="/editentertainer" element={<EditEntertainer/>}/>
          <Route path="/bookingcalendar" element={<BookingCalendar/>}/>





          
          {/* protected routes */}

        </Routes>
      </HelmetProvider>
    </>
  );
}

export default App;
