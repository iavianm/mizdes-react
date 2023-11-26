import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../SiteSlider/SiteSlider.css";
import Hero from "../Hero/Hero";
import VillasSection from "../VillasSection/VillasSection";
import "./SpaPage.css";
import heroContent from "../../content/heroContent.json";
import villas from "../../content/villasSpa.json";
import titles from "../../content/villasSectionTitles.json";
import sliderSpaImages from "../../content/sliderSpaImages.json";
import { useEffect } from "react";

const SpaPage = ({ handleTogglePopup }) => {
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
    <section className="main">
      <Hero
        content={heroContent.spaPage}
        handleTogglePopup={handleTogglePopup}
      />
      <div className="villas-spa__section">
        <VillasSection
          villas={villas.villas}
          about={titles.spaPage}
          className="grid-spa"
        />
      </div>
      <div className="slider-spa">
        <Slider {...customSliderSettings}>
          {sliderSpaImages.spa.map((item) => (
            <div key={item.id}>
              <img src={item.src} alt={item.alt} className="slider-spa__img" />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SpaPage;
