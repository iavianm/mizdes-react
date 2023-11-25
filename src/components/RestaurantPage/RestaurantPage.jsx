import "./RestaurantPage.css";
import Hero from "../Hero/Hero.jsx";
import RestaurantMenu from "../RestauranMenu/RestaurantMenu.jsx";
import Slider from "react-slick";
import { restaurant } from "../../content/sliderRestaurantImages.json";
import heroContent from "../../content/heroContent.json";

export default function RestaurantPage() {
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
      <Hero content={heroContent.restauranPage} />
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
