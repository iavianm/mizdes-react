import { Helmet } from "react-helmet";
import Hero from "../Hero/Hero";
import Houses from "../Houses/Houses.jsx";
import housesContent from "../../content/housesContent.json";
import TerraceBlock from "../TerraceBlock/TerraceBlock.jsx";
import heroContent from "../../content/heroContent.json";
import { useEffect, useState } from "react";
import HousesPopup from "../HousesPopup/HousesPopup.jsx";
import homeSlider from "../../content/homeSlider.json";

const HousesPage = ({ handleTogglePopup, handleChangeVillas }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  function toggleBodyOverflow() {
    const body = document.body;
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
    body.style.height = body.style.height === "100vh" ? "" : "100vh";
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
      <Helmet>
        <title>Аренда Эксклюзивных Коттеджей - Мы Здесь</title>
        <meta
          name="description"
          content="Исследуйте нашу эксклюзивную коллекцию коттеджей для идеального отдыха. От современных вилл до уютных домов в лесу."
        />
        <meta
          name="keywords"
          content="Эксклюзивный отдых в природной зоне, Роскошные дома для отпуска в лесу, Приватные виллы для отдыха у моря, Современные дома для семейного отдыха рядом с Петербургом, Загородный дом с панорамными окнами для аренды, Уединенные коттеджи для спокойного отдыха, Стильные дома для выходных в природе, Аренда домов у Финского залива"
        />
      </Helmet>
      <Hero
        content={heroContent.housesPage}
        handleTogglePopup={handleTogglePopup}
      />
      <Houses
        house={housesContent.riviera}
        handleTogglePopup={handleTogglePopup}
        handleTogglePopupTour={handleTogglePopupTour}
        handleChangeVillas={handleChangeVillas}
        images={homeSlider.riviera}
      />
      <Houses
        house={housesContent.grandis}
        handleTogglePopup={handleTogglePopup}
        handleTogglePopupTour={handleTogglePopupTour}
        handleChangeVillas={handleChangeVillas}
        images={homeSlider.grandis}
      />
      <TerraceBlock />
      <HousesPopup
        selectedHouse={selectedHouse}
        isVisiblie={openPopup}
        onClose={handleTogglePopupTour}
        handleTogglePopup={handleTogglePopup}
        handleChangeVillas={handleChangeVillas}
      />
    </section>
  );
};

export default HousesPage;
