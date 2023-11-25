import "./RestaurantMenu.css";

const RestaurantMenu = () => {
  return (
    <section className="menu">
      <h2 className="menu__title">Разнообразное меню</h2>
      <div className="menu__container">
        <div className="menu__content">
          <p className="menu__text">
            Свободная планировка и большая сцена позволит организовать не только
            романтический ужин, но и яркое, запоминающееся мероприятие.
          </p>
          <p className="menu__text">
            А изысканные блюда кухни неоставят равнодушным ни одного гурмана.
          </p>
        </div>
        <div className="menu__links">
          <a href="#" className="menu__link">
            Посмотреть меню
          </a>
          <a href="#" className="menu__link">
            Барная карта
          </a>
        </div>

        <div className="menu__options">
          <span className="menu__option">3 этажа</span>
          <span className="menu__option">300 посадочных мест</span>
          <span className="menu__option">3,5-7 метров высота потолков</span>
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenu;
