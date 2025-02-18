import React, { useState } from "react";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const EntertainerCard = ({ entertainer }) => {
  const imagePath = import.meta.env.VITE_LOGGEDIN_IMAGE_PATH;
  const navigate = useNavigate()
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); 
    setIsFavorited((prev) => !prev);
  };
  
  const handleCardClick = (e) => {
    if (e.target.closest(".favorite-btn")) return;
    e.preventDefault();
    localStorage.setItem("entertainerId", entertainer.eid);
    navigate('/user/entertainerDetails');
  }

  const headshot = entertainer.media?.find((media) => media.type === "headshot")?.url;

  return (
    <>
  
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card card-rounded mb-3" onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <button className="favorite-btn position-absolute top-0 end-0 m-2 border-0 bg-transparent" onClick={toggleFavorite}>
          <i className={`bi ${isFavorited ? "bi-heart-fill text-danger" : "bi-heart text-light"}`} style={{ fontSize: "1.5rem" }}></i>
        </button>
        <img
          src={headshot || "../assets/pique/image/alfonso4.avif"} 
          className="card-img img-fluid"
          style={{ height: "12em", width: "16em", borderRadius:"12px" }}
          alt={entertainer.name}
        />
          <p className="custom-card-text fw-bold mt-2 mb-0">{entertainer.name}</p>
          <p className="text-muted custom-card-text">{entertainer.availability === "yes" ? "Available" : "Unavailable"} - Rs. {entertainer.pricePerEvent}</p>
      </div>
    </div>
    </>
  );
};

export default EntertainerCard;
