import "./BookingPopup.css";
import { useState } from "react";

const BookingPopup = ({ isVisible, handleTogglePopup }) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  function onClose() {
    handleTogglePopup();
  }

  return (
    <>
      <div
        className={`booking-popup-overlay ${isVisible ? "active" : ""}`}
      ></div>
      <div className={`booking-popup ${isVisible ? "active" : ""}`}>
        <div className="booking-popup-content">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <h2 className={"booking-popup-title"}>Бронирование</h2>
          <p className={"booking-popup-about"}>
            Только тем, кто присоединиться к Мы ЗДЕСЬ team с самого начала будет
            предоставлена наша накопительная бонусная карта со скидкой 5% при
            втором заселении. В дальнейшем % вашей скидки будет зависеть от
            общей потраченной суммы.
          </p>
          <form className={"form-group-container"}>
            <div className="form-group">
              <label
                htmlFor="cottage-type"
                className={"form-group-option-label"}
              >
                Желаемый коттедж
              </label>
              <select
                id="cottage-type"
                name="cottage_type"
                className="form-control form-group-option"
              >
                <option value="riviera">Ривьера</option>
                <option value="grandis">Грандис</option>
                <option value="haigarden">Хайгарден</option>
                <option value="any">Любой вариант</option>
              </select>
            </div>
            <div className="form-group-date">
              <input
                type="text"
                id="arrival-date"
                name="arrival_date"
                className="form-control"
                placeholder="Дата заезда"
                onFocus={(e) => {
                  e.target.type = "date";
                  e.target.placeholder = "";
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = "text";
                    e.target.placeholder = "Дата заезда";
                  }
                }}
              />
            </div>
            <div className="form-group-date">
              <input
                type="text"
                id="departure-date"
                name="departure_date"
                className="form-control"
                placeholder="Дата выезда"
                onFocus={(e) => {
                  e.target.type = "date";
                  e.target.placeholder = "";
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.type = "text";
                    e.target.placeholder = "Дата выезда";
                  }
                }}
              />
            </div>
            <div className="form-group quantity-selector">
              <label className="quantity-label">Взрослые</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-minus"
                  onClick={() => setAdults(adults > 0 ? adults - 1 : 0)}
                >
                  -
                </button>
                <input
                  type="text"
                  id="adults"
                  name="adults"
                  className="quantity-input"
                  readOnly
                  value={adults} // Здесь должно быть состояние из вашего компонента
                />
                <button
                  type="button"
                  className="quantity-plus"
                  onClick={() => setAdults(adults + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group quantity-selector">
              <label className="quantity-label">Дети</label>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-minus"
                  onClick={() => setChildren(children > 0 ? children - 1 : 0)}
                >
                  -
                </button>
                <input
                  type="text"
                  id="children"
                  name="children"
                  className="quantity-input"
                  readOnly
                  value={children} // И здесь состояние из вашего компонента
                />
                <button
                  type="button"
                  className="quantity-plus"
                  onClick={() => setChildren(children + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Ваше имя</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Ваш телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="+7 (999) 999-99-99"
              />
            </div>
            <button type="submit" className="submit-button">
              Забронировать
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingPopup;
