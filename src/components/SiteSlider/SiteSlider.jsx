import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SiteSlider.css";
import { Link } from "react-router-dom";

const SiteSlider = ({ title, images, link }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  let duplicatedSlides = [...images];
  if (images.length <= settings.slidesToShow) {
    duplicatedSlides = [...images, ...images, ...images]; // Дублируем слайды
  }

  return (
    <div className="slider__content">
      <h2 className="slider__header">{title}</h2>
      <div className="slider__container">
        <Slider {...settings}>
          {duplicatedSlides.map((item) => (
            <div key={item.id} className="slider__img-container">
              <img src={item.src} alt={item.alt} className="slider__img" />
              <p className="slider__description">{item.description}</p>
            </div>
          ))}
        </Slider>
        <div className={"slider__button"}>
          <Link to={link} className="btn btn-primary">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SiteSlider;
