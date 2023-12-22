import React from "react";
import "./VillaCard.css";

const VillaCard = ({
  name,
  area,
  rooms,
  price,
  nyPrice,
  description,
  imageSrc,
}) => {
  return (
    <div className="card">
      <div className="imageWrapper">
        <img
          src={imageSrc}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="info">
        <div className={"about-container"}>
          <div className="about">
            <h3 className="title">{name}</h3>
            <div className="details">
              <span className="area">{area}</span>
              <span className="rooms">{rooms}</span>
              <span>Цена: {price}</span>
            </div>
          </div>
          <div className={"card-price-new-year"}>{nyPrice}</div>
        </div>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default VillaCard;
