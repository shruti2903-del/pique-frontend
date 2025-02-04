import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Button from "../../components/Button";
import DashLayoutEnter from "../../components/Entertainer/DashLayoutEnter";
import PiqueFooter from "../../components/PiqueComponents/PiqueFooter";

export default function BookingRequest() {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBookingRequests = async () => {
       
            try {
              const response = await axios.get(
                `${import.meta.env.VITE_API_URL}entertainers/booking/request`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Response:",response); 
              setBookingRequests(response.data);
            //   setLoading(false);
            } catch (err) {
              console.error("Error fetching booking requests:", err);
              setError("Error fetching booking requests");
              setLoading(false);
            }
        
    }

    fetchBookingRequests();
  }, [token]);

  const handleBookingResponse = async (bookingId, isAccepted) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}entertainers/booking/response`,
        {
          bookingId,
          isAccepted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setBookingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === bookingId ? { ...request, isAccepted } : request
        )
      );
      if (isAccepted === "accepted") {
        toast.success("Booking Accepted");
      } else {
        toast.error("Booking Rejected");
      }
    } catch (error) {
      console.error("Error updating booking status", error);
      toast.error("Failed to update booking status");
    }
  };

  return (
    <>
      <DashLayoutEnter title ="Booking Request" description="View and manage your bookings">
          <Toaster position="top-center" reverseOrder={false} />
        <div className="container-fluid d-flex flex-column min-vh-100 mt-5">

          <div className="row">
            <div className="col-md-12 mt-4">
              <h2 className="text-secondary text-center">
                All Booking Requests
              </h2>
              { bookingRequests.length === 0 ? (
                <div className="alert alert-warning text-center mt-5">No bookings yet.</div>
              ) : (
                <div className="table-responsive mt-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        {/* <th>Name</th>
                        <th>Email</th>
                        <th>Contact Number</th> */}
                        <th>Show Time</th>
                        <th>Show Date</th>
                        <th>Special Notes</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingRequests.map((request, index) => (
                        <tr key={request.id}>
                          <td>{index + 1}</td>
                          {/* <td>{request.venueUser?.name || "N/A"}</td>
                          <td>{request.venueUser?.email || "N/A"}</td>
                          <td>{request.venueUser?.phoneNumber || "N/A"}</td> */}
                          <td>{request.showTime || "N/A"}</td>
                          <td>{request.showDate || "N/A"}</td>
                          <td>{request.specialNotes || "N/A"}</td>
                          <td>
                            <Button
                              className="btn btn-success me-2"
                              onClick={() =>
                                handleBookingResponse(request.id, "accepted")
                              }
                              label="Accept"
                            />
                            <Button
                              className="btn btn-danger"
                              onClick={() =>
                                handleBookingResponse(request.id, "rejected")
                              }
                              label="Decline"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
       </div>
       <PiqueFooter/>
      </DashLayoutEnter>
    </>
  );
}
