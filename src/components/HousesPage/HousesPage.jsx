import Hero from "../Hero/Hero";
import Houses from "../Houses/Houses.jsx";
import housesContent from "../../content/housesContent.json";
import TerraceBlock from "../TerraceBlock/TerraceBlock.jsx";
import heroContent from "../../content/heroContent.json";
// import TourPopup from "@/app/components/TourPopup/TourPopup";

const HousesPage = ({ handleTogglePopup }) => {
  return (
    <section className={"main"}>
      <Hero content={heroContent.housesPage} />
      <Houses
        house={housesContent.riviera}
        handleTogglePopup={handleTogglePopup}
      />
      <Houses
        house={housesContent.grandis}
        handleTogglePopup={handleTogglePopup}
      />
      <Houses
        house={housesContent.highgarden}
        handleTogglePopup={handleTogglePopup}
      />
      <TerraceBlock />
      {/*<TourPopup />*/}
    </section>
  );
};

export default HousesPage;
