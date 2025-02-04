import React from 'react'
import VenueDashSidebar from './VenueDashSidebar'
import VenueDashNavbar from './VenueDashNavbar'
import { Helmet } from 'react-helmet-async'

export default function DashLayoutVenue({ title, description, children }) {
  return (
    <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            <div className="container-xxl position-relative bg-light d-flex p-0">
                <VenueDashSidebar />
                <div className="content">
                    <VenueDashNavbar className="mb-5"/>
                    {children}
                </div>
            </div>
        </>
  )
}
