import "./BurgerMenu.css";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function BurgerMenu({
  isOpen,
  onClose,
  handleTogglePopup,
  loggedIn,
  handleLogout,
}) {
  const location = useLocation();
  const isAdminPanel = location.pathname.includes("/admin");

  function handleBurgerLogout() {
    handleLogout();
    onClose();
  }

  return (
    <div className={`burger__overlay ${isOpen ? "open" : ""}`}>
      <div className={`burger__menu ${isOpen ? "open-menu" : "close-menu"}`}>
        <button className="burger__close-btn" onClick={onClose}>
          <img src="/images/close-icon.svg" alt={"закрыть"}></img>
        </button>
        <Link className={"header__logo-link"} to={"/"} onClick={onClose}>
          <img
            className="burger__logo"
            src="/images/logo.svg"
            alt="логотип"
          ></img>
        </Link>
        <div className={"burger__container"}>
          <nav className="burger__nav">
            <ul className="burger__list">
              <li>
                <NavLink className={"burger__item"} to={"/"} onClick={onClose}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/houses"
                  className={"burger__item"}
                  onClick={onClose}
                >
                  Номера
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/restaurant"
                  className={"burger__item"}
                  onClick={onClose}
                >
                  Рестораны
                </NavLink>
              </li>
              <li>
                <NavLink to="/spa" className={"burger__item"} onClick={onClose}>
                  СПА
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/develop"
                  className={"burger__item"}
                  onClick={onClose}
                >
                  В процессе
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacts"
                  className={"burger__item"}
                  onClick={onClose}
                >
                  Контакты
                </NavLink>
              </li>

              {loggedIn && (
                <li>
                  <NavLink
                    to="/admin"
                    className={"burger__item"}
                    onClick={onClose}
                  >
                    Админ панель
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div>
            <div className="burger__description">
              <p className="burger__number">+7 921 909 57 00</p>
              <a className="burger__link" href="mailto:mizdesclub@yandex.ru">
                mizdesclub@yandex.ru
              </a>
            </div>
            {loggedIn && isAdminPanel ? (
              <button
                className={"header__button burger__reserv-btn"}
                onClick={handleBurgerLogout}
              >
                Выйти
              </button>
            ) : (
              <button
                className={"header__button burger__reserv-btn"}
                onClick={handleTogglePopup}
              >
                Забронировать
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
