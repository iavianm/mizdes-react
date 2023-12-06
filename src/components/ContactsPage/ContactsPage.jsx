import "./ContactsPage.css";
import { useEffect } from "react";

const ContactsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main">
      <section className="contacts">
        <div className="contacts__container">
          <h2 className="contacts__title">Мы ЗДЕСЬ, в Курортном районе</h2>
          <div className="contacts__text">
            <p>Ленинградская область, Выборгский район,</p>
            <p>Приморское городское поселение, Рощинское лесничество,</p>
            <p>Полянское сельское поселение</p>
          </div>
          <div className="contacts__connect">
            <a className="contacts__link" href="tel:+79219095700">
              +7 921 909 57 00
            </a>
            <a className="contacts__link" href="mailto:mizdesclub@yandex.ru">
              mizdesclub@yandex.ru
            </a>
          </div>

          <iframe
            className="contacts__frame"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Adadf61b860d583f6293529f22ec1d8661c2270ae707a2bafebadf6f3b8d9b1ab&amp;source=constructor"
            width="100%"
            height="400"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default ContactsPage;
