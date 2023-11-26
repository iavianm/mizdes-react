import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState, useEffect } from "react";

function Header({ handleTogglePopup }) {
  const [burgerOpened, setBurgerOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleOpenBurger() {
    setBurgerOpened(!burgerOpened);
  }

  return (
    <header className={"header"}>
      {windowWidth > 768 ? (
        <>
          <Link className={"header__logo-link"} to={"/"}>
            <img
              src="/images/header-logo.svg"
              alt="Логотип"
              className="header__logo"
            />
          </Link>
          <ul className={"header__list"}>
            <li className={"header__list-items"}>
              <NavLink to="/" className={"header__list-item"}>
                Главная
              </NavLink>
            </li>
            <li className={"header__list-items"}>
              <NavLink to="/houses" className={"header__list-item"}>
                Номера
              </NavLink>
            </li>
            <li className={"header__list-items"}>
              <NavLink to="/spa" className={"header__list-item"}>
                СПА
              </NavLink>
            </li>
            <li className={"header__list-items"}>
              <NavLink to="/restaurant" className={"header__list-item"}>
                Ресторан
              </NavLink>
            </li>
            <li className={"header__list-items"}>
              <NavLink to="/contacts" className={"header__list-item"}>
                Контакты
              </NavLink>
            </li>
          </ul>
          <button className={"header__button"} onClick={handleTogglePopup}>
            Забронировать
          </button>
        </>
      ) : (
        <>
          <Link className={"header__logo-link"} to={"/"}>
            <img
              src="/images/logo-white.svg"
              alt="Логотип"
              className="header__logo"
            />
          </Link>
          <button className="header-burger__btn" onClick={handleOpenBurger}>
            <img
              className="header-burger__img"
              src="/images/burger-icon.svg"
              alt="кнопка меню"
            ></img>
          </button>
          <BurgerMenu
            isOpen={burgerOpened}
            onClose={handleOpenBurger}
            handleTogglePopup={handleTogglePopup}
          />
        </>
      )}
    </header>
  );
}

export default Header;
