import "./RestaurantPage.css";
import Hero from "../Hero/Hero.jsx";
import RestaurantMenu from "../RestauranMenu/RestaurantMenu.jsx";
import Slider from "react-slick";
import { restaurant } from "../../content/sliderRestaurantImages.json";
import heroContent from "../../content/heroContent.json";
import { useEffect } from "react";

export default function RestaurantPage({ handleTogglePopup }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const customSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    focusOnSelect: false,
  };

  return (
    <section className="restaurant">
      <Hero
        content={heroContent.restauranPage}
        handleTogglePopup={handleTogglePopup}
      />
      <RestaurantMenu />
      <div className="slider__restaurant">
        <Slider {...customSliderSettings}>
          {restaurant.map((item) => (
            <div key={item.id}>
              <img
                src={item.src}
                alt={item.alt}
                className="slider__restaurant-img"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
