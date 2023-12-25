import { Helmet } from "react-helmet";
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
      <Helmet>
        <title>Мы Здесь - Главная</title>
        <meta
          name="description"
          content="Лучшие коттеджи и виллы для вашего отдыха вблизи Санкт-Петербурга. Аренда коттеджей. Финский залив. Отдых на природе. Эко коттеджи рядом с лесом. Отдых на природе у воды. Премиум отдых в России. Аренда коттеджа с видом на залив."
        />
        <meta
          name="keywords"
          content="Коттеджи у Санкт-Петербурга, Аренда коттеджей Финский залив, Загородный отдых в России, Эко коттеджи рядом с лесом, Семейный отдых на природе, Аренда виллы у моря, Отдых на природе у воды, Премиум отдых в России, Уютные коттеджи для отдыха, Современные виллы для аренды, Выходные в загородном доме под Санкт-Петербургом"
        />
      </Helmet>
      <Hero content={heroContent.homePage} />
      <FeaturesSection />
      <VillasSection villas={villas} about={villasTitles.homePage} />
      <TextBlock />
    </section>
  );
}
