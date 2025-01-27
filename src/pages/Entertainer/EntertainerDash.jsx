import React from 'react'
import EnterDashSidebar from '../../components/Entertainer/EnterDashSidebar'
import EnterDashNavbar from '../../components/Entertainer/EnterDashNavbar'
import { Helmet } from 'react-helmet-async'

export default function EntertainerDash() {
    return (
        <>
            <Helmet>
                <title>Entertainer Dashboard</title>
                <meta
                    name="description"
                    content="View and manage your entertainer details."
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
                            <h2 className="text-secondary text-center">Entertainer Dashboard</h2>
                        </div>
                    </div>
                </div>
                {/* <!-- Content End --> */}


            </div>
        </>
    )
}
