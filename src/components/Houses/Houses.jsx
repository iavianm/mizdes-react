import "./Houses.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

const Houses = ({
  house,
  handleTogglePopup,
  handleTogglePopupTour,
  handleChangeVillas,
  images,
}) => {
  const { key, title, specs, price, description, tags, about, buttons, image } =
    house;

  const handleButtonClick = () => {
    handleTogglePopup();
    handleChangeVillas(key);
  };

  const [showSlider, setShowSlider] = useState(false);

  const handleImageToggle = () => {
    setShowSlider(!showSlider);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <>
      <div className="container">
        <div className="villa-info">
          <div className="villa-info-size">
            <div className="villa-info-container">
              <h2 className="villa-title">{title}</h2>
              <div className="villa-specs">
                {specs.map((spec, index) => (
                  <span key={index}>{spec}</span>
                ))}
              </div>
            </div>
            <div className={"villa-price-new-year"}>{price}</div>
          </div>
          <p className="villa-description">{description}</p>

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
                <button className="button-book" onClick={handleButtonClick}>
                  {buttons.book}
                </button>
                <button
                  className="button-tour"
                  onClick={() => handleTogglePopupTour(key)}
                >
                  {buttons.tour}
                </button>
              </div>
            </div>
            <img
              className={"villa-image"}
              src={image.src}
              alt={image.alt}
              onClick={handleImageToggle}
            />
          </div>
        </div>
      </div>

      <div className={`slider-overlay ${showSlider ? "open" : ""}`}>
        <div className="slider-container">
          <button className="slider-btn">
            <img
              className="slider-btn-close"
              src="/images/close-icon.svg"
              onClick={handleImageToggle}
            ></img>
          </button>
          <div className="slider-content">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="slider__home-img"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default Houses;
