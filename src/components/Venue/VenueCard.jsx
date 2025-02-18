import React, { useState } from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import AddVenue from '../../pages/Venue/AddVenue';

export default function VenueCard({venues}) {
const navigate = useNavigate();

const handleAddVenueClick = () => {
    navigate("/user/add"); 
  };

  const handleEditClick = (venue) => {
    navigate("/user/edit", { state: { venue } }); 
  };
  
  return (
    <>
    <div className="d-flex justify-content-between">
    <p className="fw-bold profile-font mb-0">YOUR VENUES </p>
 
          <Button
            className="venue-btn btn-sm mb-0"
            type="button"
            label="Add Venue"
            onClick={handleAddVenueClick}
          />
      
    </div>
    <hr />

    <div className="row">
        {venues.map((venue) => (
          <div key={venue.id} className="col-md-3 col-sm-6 mb-4">
            <div className="card mb-3" style={{ width:"16rem" }}>
              <img
                src="../assets/pique/image/venue1.avif"
                className="card-img-top img-fluid"
                style={{ height: "10em" }}
                alt={venue.name}
              />
              <div className="div p-2">
              <p className="profile-font fw-bold mt-2 mb-0">{venue.name}</p>
              <p className='profile-font fw-semibold'>{venue.addressLine1} , {venue.addressLine2}</p>
              <p className='profile-font text-secondary'>{venue.description}</p>
              <Button className="venue-btn btn-sm w-100" type='button' onClick={() => handleEditClick(venue)}><i className="fa-regular fa-pen-to-square me-2"></i>Edit Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </>
  )
}
