import React from 'react'
import { Helmet } from 'react-helmet-async'
import EnterDashSidebar from '../../components/Entertainer/EnterDashSidebar'
import EnterDashNavbar from '../../components/Entertainer/EnterDashNavbar'

export default function BookingRequests() {
  return (
    <>
    <Helmet>
                    <title>Booking Requests</title>
                    <meta
                        name="description"
                        content="View and manage your booking requests."
                    />
                </Helmet>
                <div className="container-xxl position-relative bg-white d-flex p-0">
                    <EnterDashSidebar />
    
                    {/* <!-- Content Start --> */}
                    <div className="content">
                        {/* <!-- Navbar Start --> */}
                        <EnterDashNavbar />
                        {/* <!-- Navbar End --> */}
                        <div className="row">
                            <div className="col-md-12 mt-4">
                                <h2 className="text-secondary text-center">All Booking Requests</h2>
                            </div>
                        </div>
                    </div>
    
    
                </div>
    </>
  )
}
