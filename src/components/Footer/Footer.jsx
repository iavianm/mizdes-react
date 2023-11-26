import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <ul className="footer-nav">
            <li>
              <Link to={"/"}>Главная</Link>
            </li>
            <li>
              <Link to={"/houses"}>Номера</Link>
            </li>
            <li>
              <Link to={"/spa"}>СПА</Link>
            </li>
            <li>
              <Link to={"/restaurant"}>Ресторан</Link>
            </li>
          </ul>
          <Link to="/contacts" className="logo-link">
            <img
              src={"/images/header-logo.svg"}
              alt={"logo"}
              className={"footer__logo"}
            />
          </Link>
        </div>
        <div className={"footer-about"}>
          <div className="footer-contact">
            <address>
              <p className={"footer-address-text"}>
                Ленинградская область, Выборгский район,
              </p>
              <p className={"footer-address-text"}>
                Приморское городское поселение, Рощинское лесничество
              </p>
              <div className={"footer-address-links"}>
                <a href="tel:+79219095700">+7 921 909 57 00</a>

                <a href="mailto:info@mizdes.com">info@mizdes.com</a>
              </div>
            </address>
          </div>
          <div className="footer-section footer-copy">
            <p>&copy;{currentYear} Мы ЗДЕСЬ. Все права защищены</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
