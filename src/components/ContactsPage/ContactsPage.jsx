import "./ContactsPage.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const ContactsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main">
      <Helmet>
        <title>Мы Здесь - Контакты</title>
        <meta
          name="description"
          content="Свяжитесь с нами для бронирования или получения дополнительной информации. Наш отель расположен в Курортном районе Ленинградской области."
        />
        <meta
          name="keywords"
          content="Контакты отеля, Курортный район, Связь с отелем, Свадьба в коттедже в лесу, Конференции на свежем воздухе, Корпоративные ретриты в природе, Роскошные виллы для отпуска, Праздник на свежем воздухе, Эксклюзивные коттеджи с видом, Отдых в лесу у Санкт-Петербурга, Дома для семейного уикенда"
        />
      </Helmet>
      <section className="contacts">
        <div className="contacts__container">
          <h2 className="contacts__title">Мы ЗДЕСЬ, в Курортном районе</h2>
          <div className="contacts__text">
            <p>Ленинградская область, Выборгский район,</p>
            <p>Приморское городское поселение, Рощинское лесничество,</p>
            <p>Полянское сельское поселение</p>
          </div>
          <div className="contacts__connect">
            <a className="contacts__link" href="tel:+79215567284">
              +7 921 556 72 84
            </a>
            <a className="contacts__link" href="mailto:mizdesclub@yandex.ru">
              mizdesclub@yandex.ru
            </a>
          </div>

          <iframe
            className="contacts__frame"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Adadf61b860d583f6293529f22ec1d8661c2270ae707a2bafebadf6f3b8d9b1ab&amp;source=constructor"
            width="100%"
            height="694"
            frameBorder="0"
          >
            // width="100%" // height="400" allowFullScreen >
          </iframe>
        </div>
      </section>
    </main>
  );
};

export default ContactsPage;
