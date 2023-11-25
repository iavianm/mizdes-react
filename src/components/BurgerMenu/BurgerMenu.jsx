import "./BurgerMenu.css";
import { Link } from "react-router-dom";

export default function BurgerMenu({ isOpen, onClose }) {
  return isOpen ? (
    <div className="burger__overlay">
      <div className="burger__menu">
        <button className="burger__close-btn" onClick={onClose}>
          <img src="/images/close-icon.svg"></img>
        </button>
        <Link className={"header__logo-link"} to={"/"}>
          <img
            className="burger__logo"
            src="/images/logo.svg"
            alt="логотип"
          ></img>
        </Link>
        <nav className="burger__nav">
          <ul className="burger__list">
            <li>
              <Link className={"burger__item"} to={"/"}>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/houses" className={"burger__item"}>
                Номера
              </Link>
            </li>
            <li>
              <Link to="/restaurant" className={"burger__item"}>
                Рестораны
              </Link>
            </li>
            <li>
              <Link to="/spa" className={"burger__item"}>
                СПА
              </Link>
            </li>
            <li>
              <Link to="/contacts" className={"burger__item"}>
                Контакты
              </Link>
            </li>
          </ul>
        </nav>

        <div className="burger__description">
          <p className="burger__number">+7 921 909 57 00</p>
          <a className="burger__link" href="mailto:info@mizdes.com">
            info@mizdes.com
          </a>
        </div>
        <button className="header__button burger__reserv-btn">
          Забронировать
        </button>
      </div>
    </div>
  ) : null;
}
