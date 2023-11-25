import Hero from "../Hero/Hero";
import Houses from "../Houses/Houses.jsx";
import housesContent from "../../content/housesContent.json";
import TerraceBlock from "../TerraceBlock/TerraceBlock.jsx";
import heroContent from "../../content/heroContent.json";
// import TourPopup from "@/app/components/TourPopup/TourPopup";

const HousesPage = () => {
  return (
    <section className={"main"}>
      <Hero content={heroContent.housesPage} />
      <Houses house={housesContent.riviera} />
      <Houses house={housesContent.grandis} />
      <Houses house={housesContent.highgarden} />
      <TerraceBlock />
      {/*<TourPopup />*/}
    </section>
  );
};

export default HousesPage;
