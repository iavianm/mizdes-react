import Hero from "../Hero/Hero";
import Houses from "../Houses/Houses.jsx";
import housesContent from "../../content/housesContent.json";
import TerraceBlock from "../TerraceBlock/TerraceBlock.jsx";
import heroContent from "../../content/heroContent.json";
import { useEffect, useState } from "react";
import HousesPopup from "../HousesPopup/HousesPopup.jsx";

const HousesPage = ({ handleTogglePopup }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  function toggleBodyOverflow() {
    const body = document.body;
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
    body.style.height = body.style.height === '100vh' ? '' : '100vh';
  }

  function handleTogglePopupTour(house) {
    setSelectedHouse(house);
    setOpenPopup(!openPopup);
    toggleBodyOverflow();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={"main"}>
      <Hero
        content={heroContent.housesPage}
        handleTogglePopup={handleTogglePopup}
      />
      <Houses
        house={housesContent.riviera}
        handleTogglePopup={handleTogglePopup}
        handleTogglePopupTour={handleTogglePopupTour}
      />
      <Houses
        house={housesContent.grandis}
        handleTogglePopup={handleTogglePopup}
        handleTogglePopupTour={handleTogglePopupTour}
      />
      <Houses
        house={housesContent.highgarden}
        handleTogglePopup={handleTogglePopup}
        handleTogglePopupTour={handleTogglePopupTour}
      />
      <TerraceBlock />
      <HousesPopup
        selectedHouse={selectedHouse}
        isVisiblie={openPopup}
        onClose={handleTogglePopupTour}
      />
    </section>
  );
};

export default HousesPage;
