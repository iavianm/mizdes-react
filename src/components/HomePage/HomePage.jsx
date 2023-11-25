import Hero from "../Hero/Hero.jsx";
import heroContent from "../../content/heroContent.json";
import FeaturesSection from "../FeaturesSection/FeaturesSection.jsx";
import VillasSection from "../VillasSection/VillasSection.jsx";
import villasTitles from "../../content/villasSectionTitles.json";
import PremiumVilla from "../PremiumVilla/PremiumVilla.jsx";
import SiteSlider from "../SiteSlider/SiteSlider.jsx";
import slidersTitles from "../../content/sliderTexts.json";
import sliderHomeImages from "../../content/sliderHomeImages.json";
import InteractiveMap from "../InteractiveMap/InteractiveMap.jsx";
import LeisureBlock from "../LeisureBlock/LeisureBlock.jsx";
import TextBlock from "../TextBlock/TextBlock.jsx";
import { villas } from "../../content/villasMain.json";

export default function HomePage() {
  return (
    <section className={"main"}>
      <Hero content={heroContent.homePage} />
      <FeaturesSection />
      <VillasSection villas={villas} about={villasTitles.homePage} />
      <PremiumVilla />
      <SiteSlider
        title={slidersTitles.homePage.titleRes}
        images={sliderHomeImages.restaurant}
      />
      <SiteSlider
        title={slidersTitles.homePage.titleSpa}
        images={sliderHomeImages.spa}
      />
      <InteractiveMap />
      <LeisureBlock />
      <TextBlock />
    </section>
  );
}
