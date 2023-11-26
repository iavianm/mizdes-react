import "./Houses.css";
import BookingPopup from "../BookingPopup/BookingPopup.jsx";
import { useState } from "react";

const Houses = ({ house, handleTogglePopup, handleTogglePopupTour }) => {
  const { title, specs, description, tags, about, buttons, image } = house;

  return (
    <>
      <div className="container">
        <div className="villa-info">
          <div className="villa-info-size">
            <div className="villa-info-container">
              <h1 className="villa-title">{title}</h1>
              <div className="villa-specs">
                {specs.map((spec, index) => (
                  <span key={index}>{spec}</span>
                ))}
              </div>
            </div>

            <p className="villa-description">{description}</p>
          </div>

          <div className="villa-tags">
            {tags.map((tag, index) => (
              <span key={index} className={"villa-tags-items"}>
                {tag}
              </span>
            ))}
          </div>
          <div className="villa-description-container">
            <div className="villa-description-about">
              <div className="villa-content">
                {about.map((paragraph, index) => (
                  <p className="villa-text" key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="buttons-container">
                <button className="button-book" onClick={handleTogglePopup}>
                  {buttons.book}
                </button>
                <button className="button-tour" onClick={handleTogglePopupTour}>{buttons.tour}</button>
              </div>
            </div>
            <div className="villa-image">
              <img
                src={image.src}
                alt={image.alt}
                // layout="fill"
                // objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Houses;
