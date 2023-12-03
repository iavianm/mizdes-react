import Hero from "../Hero/Hero";
import LeisureBlock from "../LeisureBlock/LeisureBlock";
import "./DevelopPage.css";
import heroContent from "../../content/heroContent.json";
import { restaurant } from "../../content/sliderRestaurantImages.json";
import DevelopContent from "../DevelopContent/DevelopContent";
import developContent from "../../content/developContent.json";
import Slider from "react-slick";
import { useEffect } from "react";

export default function DevelopPage() {
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
    <>
      <Hero content={heroContent.developPage} />
      <section className="develop">
        <DevelopContent content={developContent.restaurant} />
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
        <DevelopContent content={developContent.spa} />

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
        <LeisureBlock />
      </section>
    </>
  );
}
