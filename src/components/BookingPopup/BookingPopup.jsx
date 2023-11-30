import "./BookingPopup.css";
import { useEffect, useState } from "react";
import AuthForm from "../AuthForm/AuthForm.jsx";

const BookingPopup = ({
  isVisible,
  handleTogglePopup,
  handleCreateBooking,
  villaType,
}) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cottageType, setCottageType] = useState("any");
  const { register, errors, isValid, handleSubmit, reset, setValue } =
    AuthForm();

  const handleSetAdults = (newAdults) => {
    setAdults(newAdults);
    setValue("adults", newAdults);
  };

  const handleSetChildren = (newChildren) => {
    setChildren(newChildren);
    setValue("children", newChildren);
  };

  function onClose() {
    handleTogglePopup();
    if (isVisible) {
      setAdults(1);
      setChildren(0);
      reset();
    }
  }

  useEffect(() => {
    setCottageType(villaType);
    setValue("cottage_type", villaType);
  }, [villaType]);

  const onSubmit = (data) => {
    handleCreateBooking(data);
    if (isVisible) {
      setAdults(1);
      setChildren(0);
      reset();
    }
  };

  const errorPhone = {
    type: String,
    required: "Обязательное поле",
    minLength: {
      value: 10,
      message: "Минимальное кол-во символов: 9",
    },
    maxLength: {
      value: 18,
      message: "Максимальное кол-во символов: 18",
    },
    pattern: {
      value: /^\+?[0-9\- ]+$/,
      message: "Поле должно содержать только цифры, пробелы и плюс",
    },
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setCottageType(selectedValue);
    setValue("cottage_type", selectedValue);
  };

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
          <form
            className={"form-group-container"}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
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
                {...register("cottage_type")}
                className="form-control form-group-option"
                value={cottageType}
                onChange={handleSelectChange}
              >
                <option value="riviera">Ривьера</option>
                <option value="grandis">Грандис</option>
                {/*<option value="highgarden">Хайгарден</option>*/}
                <option value="any">Любой вариант</option>
              </select>
            </div>
            <div className="form-group-date">
              <input
                {...register("arrival_date")}
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
                {...register("departure_date")}
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
                  onClick={() => handleSetAdults(adults > 0 ? adults - 1 : 0)}
                >
                  -
                </button>
                <input
                  type="text"
                  id="adults"
                  name="adults"
                  {...register("adults")}
                  className="quantity-input"
                  readOnly
                  value={adults} // Здесь должно быть состояние из вашего компонента
                />
                <button
                  type="button"
                  className="quantity-plus"
                  onClick={() => handleSetAdults(adults + 1)}
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
                  onClick={() =>
                    handleSetChildren(children > 0 ? children - 1 : 0)
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  id="children"
                  name="children"
                  {...register("children")}
                  className="quantity-input"
                  readOnly
                  value={children} // И здесь состояние из вашего компонента
                />
                <button
                  type="button"
                  className="quantity-plus"
                  onClick={() => handleSetChildren(children + 1)}
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
                {...register("name")}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Ваш телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                {...register("phone", errorPhone)}
                className="form-control"
                placeholder="+7 999 888 77 66"
              />
              <span
                className={`input__error ${errors ? "input__error-show" : ""}`}
              >
                {errors ? errors["phone"]?.message || "" : ""}
              </span>
            </div>
            <button
              type="submit"
              className={`submit-button ${
                !isValid ? "submit-button-disable" : ""
              }`}
              disabled={!isValid}
            >
              Забронировать
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingPopup;
