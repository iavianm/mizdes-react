import Hero from "../Hero/Hero.jsx";
import heroContent from "../../content/heroContent.json";
import FeaturesSection from "../FeaturesSection/FeaturesSection.jsx";
import VillasSection from "../VillasSection/VillasSection.jsx";
import villasTitles from "../../content/villasSectionTitles.json";
import TextBlock from "../TextBlock/TextBlock.jsx";
import { villas } from "../../content/villasMain.json";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={"main"}>
      <Hero content={heroContent.homePage} />
      <FeaturesSection />
      <VillasSection villas={villas} about={villasTitles.homePage} />
      <TextBlock />
    </section>
  );
}
