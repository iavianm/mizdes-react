import Hero from "../Hero/Hero";
import LeisureBlock from "../LeisureBlock/LeisureBlock";
import "./DevelopPage.css";
import heroContent from "../../content/heroContent.json";
import { restaurant } from "../../content/sliderRestaurantImages.json";
import { spa } from "../../content/sliderSpaImages.json";
import DevelopContent from "../DevelopContent/DevelopContent";
import developContent from "../../content/developContent.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";

export default function DevelopPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const settings = {
    dots: true,
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
      <section className="main">
        <Hero content={heroContent.developPage} />
        <DevelopContent content={developContent.restaurant} />

        <div className="slider__restaurant">
          <Slider {...settings}>
            {restaurant.map((item, index) => (
              <div key={index}>
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

        <div className="slider-spa">
          <Slider {...settings}>
            {spa.map((item) => (
              <div key={item.id}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="slider-spa__img"
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
