import React from 'react'
import { Helmet } from 'react-helmet-async'
import VenueDashSidebar from '../../components/Venue/VenueDashSidebar'
import VenueDashNavbar from '../../components/Venue/VenueDashNavbar'
import Input from '../../components/Input'

export default function UpdateVenue() {
  return (
    <>
      <Helmet>
        <title>Update Profile</title>
        <meta name="description" content="View and update your profile." />
      </Helmet>
      <div className="container-xxl position-relative bg-light d-flex p-0">
        <VenueDashSidebar />

        <div className="content">
          <VenueDashNavbar />

          <div className="row">
            <div className="col-md-12 mt-4">
              <h2 className="text-secondary text-center mb-3">Update Profile</h2>
              <div className="d-flex justify-content-center">
                <div className="card col-md-11 shadow-lg p-5">
                  <div className="card-body text-center">
                    <form onSubmit={handleSubmit}>
                      <h4 className="text-start">General Information</h4>
                      <hr />
                      <div className="row">
                        <div className="col-md-4 text-start">
                          <label htmlFor="name" className="fw-bold">
                            Name
                          </label>
                          <Input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                          {errors.name && (
                            <small className="text-danger">{errors.name}</small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="phone" className="fw-bold">
                            Phone
                          </label>
                          <Input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          {errors.phone && (
                            <small className="text-danger">
                              {errors.phone}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="email" className="fw-bold">
                            Email
                          </label>
                          <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {errors.email && (
                            <small className="text-danger">
                              {errors.email}
                            </small>
                          )}
                        </div>
                      </div>
                      <h4 className="text-start mt-4">Address Details</h4>
                      <hr />
                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="addressLine1" className="fw-bold">
                            Address Line 1
                          </label>
                          <Input
                            type="text"
                            name="addressLine1"
                            placeholder="Address Line 1"
                            value={formData.addressLine1}
                            onChange={handleChange}
                          />
                          {errors.addressLine1 && (
                            <small className="text-danger">
                              {errors.addressLine1}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="addressLine2" className="fw-bold">
                            Address Line 2
                          </label>
                          <Input
                            type="text"
                            name="addressLine2"
                            placeholder="Address Line 2"
                            value={formData.addressLine2}
                            onChange={handleChange}
                          />
                          {errors.addressLine2 && (
                            <small className="text-danger">
                              {errors.addressLine2}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="location" className="fw-bold">
                            Description
                          </label>
                          <Input
                            type="text"
                            name="description"
                            placeholder="Describe your venue"
                            value={formData.description}
                            onChange={handleChange}
                          />
                          {errors.description && (
                            <small className="text-danger">
                              {errors.description}
                            </small>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="city" className="fw-bold">
                            City
                          </label>
                          <Input
                            type="text"
                            name="city"
                            placeholder="Enter your city name"
                            value={formData.city}
                            onChange={handleChange}
                          />
                          {errors.city && (
                            <small className="text-danger">{errors.city}</small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="state" className="fw-bold">
                            State
                          </label>
                          <Input
                            type="text"
                            name="state"
                            placeholder="Enter your state "
                            value={formData.state}
                            onChange={handleChange}
                          />
                          {errors.state && (
                            <small className="text-danger">
                              {errors.state}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="zipCode" className="fw-bold">
                            Zip Code
                          </label>
                          <Input
                            type="text"
                            name="zipCode"
                            placeholder="Enter your zip code"
                            value={formData.zipCode}
                            onChange={handleChange}
                          />
                          {errors.zipCode && (
                            <small className="text-danger">
                              {errors.zipCode}
                            </small>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="country" className="fw-bold">
                            Counytry
                          </label>
                          <Input
                            type="text"
                            name="country"
                            placeholder="Enter your country"
                            value={formData.country}
                            onChange={handleChange}
                          />
                          {errors.country && (
                            <small className="text-danger">
                              {errors.country}
                            </small>
                          )}
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="lat" className="fw-bold">
                            Latitude
                          </label>
                          <Input
                            type="text"
                            name="lat"
                            placeholder=" "
                            value={formData.lat}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="long" className="fw-bold">
                            Longitude
                          </label>
                          <Input
                            type="text"
                            name="long"
                            placeholder=""
                            value={formData.long}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <h4 className="text-start mt-4">Venue Information</h4>
                      <hr />
                      <div className="row mb-3 mt-4">
                        <div className="col-md-4 text-start">
                          <label htmlFor="amenities" className="fw-bold">
                            Amenities
                          </label>
                          <Input
                            type="text"
                            name="amenities"
                            placeholder="List your amenities"
                            value={formData.amenities}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="websiteUrl" className="fw-bold">
                            Website URL
                          </label>
                          <Input
                            type="text"
                            name="websiteUrl"
                            placeholder="Enter your website URL"
                            value={formData.websiteUrl}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="col-md-4 text-start">
                          <label htmlFor="timings" className="fw-bold">
                            Timings
                          </label>
                          <Input
                            type="time"
                            name="timings"
                            value={formData.timings}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="row ">
                        <div className="col-md-12 text-start">
                          <label htmlFor="bookingPolicies" className="fw-bold">
                            Booking Policies
                          </label>
                          <Input
                            type="text"
                            name="bookingPolicies"
                            value={formData.bookingPolicies}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="btn-primary mt-3 w-25 fw-semibold"
                        label="Submit"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
