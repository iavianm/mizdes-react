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
            <a className="contacts__link" href="mailto:info@mizdes.com">
              info@mizdes.com
            </a>
          </div>

          <iframe
            className="contacts__frame"
            src="https://yandex.ru/map-widget/v1/?from=mapframe&ll=29.062070%2C60.185200&mode=usermaps&source=mapframe&um=constructor%3Ab4237b51cdc93a034c38b3234b59c27d4f45dea18bed855a6632e0489d29425e&utm_source=mapframe&z=14"
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
