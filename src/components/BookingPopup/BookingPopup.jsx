import "./BookingPopup.css";
import { useEffect, useRef, useState } from "react";
import AuthForm from "../AuthForm/AuthForm.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, utcToZonedTime } from "date-fns-tz";
import { parse } from "date-fns";
import { Controller } from "react-hook-form";
import { getLatestBookings } from "../../utils/api.js";

const BookingPopup = ({
  isVisible,
  handleTogglePopup,
  handleCreateBooking,
  handleUpdateBooking,
  initialBooking,
}) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cottageType, setCottageType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [name, setName] = useState("");
  const [availabilityMessage, setAvailabilityMessage] = useState({});
  const [availabilityState, setAvailabilityState] = useState({});
  const [availabilityStateButton, setAvailabilityStateButton] = useState(false);
  const dropdownRef = useRef(null);
  const [bookedDates, setBookedDates] = useState([]);
  const {
    register,
    errors,
    isValid,
    handleSubmit,
    reset,
    setValue,
    trigger,
    control,
    getValues,
  } = AuthForm({ defaultValues: initialBooking });
  const timeZone = "Europe/Moscow";

  const isEditing = !!initialBooking;

  useEffect(() => {
    getLatestBookings().then((res) => {
      setBookedDates(res);
    });
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCheckboxes(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isVisible && initialBooking) {
      Object.keys(initialBooking).forEach((key) => {
        if (key === "cottageType") {
          setCottageType(initialBooking[key]);
          setValue("cottage_type", initialBooking[key]);
        }
        if (key === "name") {
          setName(initialBooking[key]);
          setValue("name", initialBooking[key]);
        }

        if (key === "additionalOptions") {
          setSelectedOptions(initialBooking[key]);
        }

        if (key === "adults") {
          setAdults(initialBooking[key]);
        }

        if (key === "children") {
          setChildren(initialBooking[key]);
        }

        if (key === "arrivalDate") {
          const arrivalDate = utcToZonedTime(
            new Date(parseDateString(initialBooking[key])),
            timeZone,
          );

          setArrivalDate(arrivalDate);
          setValue("arrivalDate", arrivalDate);
        }

        if (key === "departureDate") {
          const departureDate = utcToZonedTime(
            new Date(parseDateString(initialBooking[key])),
            timeZone,
          );

          setDepartureDate(departureDate);
          setValue("departureDate", departureDate);
        }

        if (key === "phone") {
          setValue("phone", initialBooking[key]);
        }

        if (key === "email") {
          setValue("email", initialBooking[key]);
        }
      });
      trigger();
    }
  }, [initialBooking, isVisible, setValue, trigger]);

  const handleCheckboxChange = (event) => {
    const optionValue = event.target.value;
    setSelectedOptions(
      event.target.checked
        ? [...selectedOptions, optionValue]
        : selectedOptions.filter((option) => option !== optionValue),
    );
  };

  const toggleCheckboxes = () => setShowCheckboxes(!showCheckboxes);

  const handleSetAdults = (newAdults) => {
    setAdults(newAdults);
    setValue("adults", newAdults);
  };

  const handleSetChildren = (newChildren) => {
    setChildren(newChildren);
    setValue("children", newChildren);
  };

  useEffect(() => {
    setAdults(1);
    setChildren(0);
    setSelectedOptions([]);
    setAvailabilityMessage({});
    setCottageType("");
    setArrivalDate("");
    setDepartureDate("");
    setName("");
    reset();
  }, [isVisible]);

  function onClose() {
    handleTogglePopup();
  }

  const onSubmit = (data) => {
    const bookingData = {
      cottage_type: cottageType,
      additional_options: selectedOptions,
      arrival_date: formatDate(arrivalDate),
      departure_date: formatDate(departureDate),
      name: data.name,
      adults: data.adults,
      children: data.children,
      phone: data.phone,
      email: data.email,
    };

    if (initialBooking) {
      handleUpdateBooking(initialBooking._id, bookingData);
    } else {
      handleCreateBooking(bookingData);
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

  const errorEmail = {
    type: String,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
      message: "Некорректный E-mail",
    },
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setCottageType(selectedValue);
    setValue("cottage_type", selectedValue);
  };

  const isValidDateFormat = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const checkAvailabilityAndUpdateMessage = (startDate, endDate) => {
    if (!startDate || !endDate || isEditing) return {};

    const editingBookingId = initialBooking ? initialBooking._id : null;

    const startDateParse = isValidDateFormat(startDate)
      ? startDate
      : parseDateString(startDate);
    const endDateParse = isValidDateFormat(endDate)
      ? endDate
      : parseDateString(endDate);

    const startBooking = utcToZonedTime(new Date(startDateParse), timeZone);
    const finishBooking = utcToZonedTime(new Date(endDateParse), timeZone);

    const availableVillas = isHouseAvailable(
      startBooking,
      finishBooking,
      bookedDates,
      editingBookingId,
    );

    setAvailabilityState(availableVillas);
    setAvailabilityStateButton(availableVillas.availableHouses);

    setAvailabilityMessage(
      Object.keys(availableVillas).length === 0
        ? {}
        : {
            available: availableVillas.availableHouses
              ? `Доступны коттеджи: ${
                  availableVillas.riviera > 0 ? "Ривьера" : ""
                }${
                  availableVillas.riviera > 0 && availableVillas.grandis > 0
                    ? ", "
                    : ""
                }${availableVillas.grandis > 0 ? "Грандис" : ""}`
              : "Нет свободных коттеджей",
          },
    );
  };

  const handleArrivalDateChange = (date) => {
    setArrivalDate(date);
    if (date && departureDate && date > departureDate) {
      setDepartureDate(date);
    }

    if (
      date &&
      getValues("departureDate") &&
      date > getValues("departureDate")
    ) {
      setValue("departureDate", date);
    }
    checkAvailabilityAndUpdateMessage(date, departureDate);
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    checkAvailabilityAndUpdateMessage(arrivalDate, date);
  };

  function formatDate(date) {
    if (!date) return "";
    const zonedDate = utcToZonedTime(date, timeZone);
    return format(zonedDate, "dd/MM/yyyy", { timeZone });
  }

  function parseDateString(dateString) {
    return parse(dateString, "dd/MM/yyyy", new Date());
  }

  const isHouseAvailable = (
    startBooking,
    finishBooking,
    bookings,
    editingBookingId,
  ) => {
    if (!startBooking) return {};
    if (!finishBooking) return {};

    let riviera = 3;
    let grandis = 2;
    let availableHouses = 5;

    const filteredBookings = bookings.filter((booking) => {
      const arrivalDateTime = utcToZonedTime(
        new Date(parseDateString(booking.arrivalDate)),
        timeZone,
      );
      return arrivalDateTime < finishBooking;
    });

    for (const booking of filteredBookings) {
      if (editingBookingId && booking._id === editingBookingId) {
        continue;
      }

      const departureDateTime = utcToZonedTime(
        new Date(parseDateString(booking.departureDate)),
        timeZone,
      );

      if (startBooking < departureDateTime) {
        availableHouses -= 1;
        if (booking.cottageType === "riviera") {
          riviera -= 1;
        }
        if (booking.cottageType === "grandis") {
          grandis -= 1;
        }
      }
    }

    return {
      availableHouses: availableHouses > 0,
      riviera: riviera > 0 ? riviera : 0,
      grandis: grandis > 0 ? grandis : 0,
    };
  };

  useEffect(() => {
    if (isVisible && initialBooking) {
      checkAvailabilityAndUpdateMessage(
        initialBooking.arrivalDate,
        initialBooking.departureDate,
      );
    }
  }, [isVisible, initialBooking]);

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
          <h2 className={"booking-popup-title"}>
            {initialBooking
              ? "Редактировать бронирование"
              : "Создать бронирование"}
          </h2>
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
            <div className={"form-group-group"}>
              <div className="form-group-date">
                <Controller
                  control={control}
                  name="arrivalDate"
                  rules={{ required: "Дата заезда обязательна" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      className={`form-control ${
                        error || !arrivalDate ? "is-invalid" : ""
                      }`}
                      selected={value}
                      onChange={(date) => {
                        handleArrivalDateChange(date);
                        onChange(date);
                      }}
                      minDate={isEditing ? arrivalDate : new Date()}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Дата заезда *"
                      disabled={isEditing}
                    />
                  )}
                />
              </div>
              <div className="form-group-date">
                <Controller
                  control={control}
                  name="departureDate"
                  rules={{ required: "Дата выезда обязательна" }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <DatePicker
                      className={`form-control ${
                        error || !departureDate ? "is-invalid" : ""
                      }`}
                      selected={value}
                      onChange={(date) => {
                        handleDepartureDateChange(date);
                        onChange(date);
                      }}
                      minDate={arrivalDate || new Date()}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Дата выезда *"
                      disabled={isEditing}
                    />
                  )}
                />
              </div>
            </div>
            <p className={"availability-title"}>
              {Object.keys(availabilityMessage).length === 0 ? (
                ""
              ) : (
                <span
                  className={`${
                    !availabilityState.availableHouses
                      ? "text-red"
                      : "text-green"
                  }`}
                >
                  {availabilityMessage.available}
                </span>
              )}
            </p>
            <div className="form-group">
              <select
                id="cottage-type"
                name="cottage_type"
                {...register("cottage_type", { required: true })}
                className={`form-control form-group-option ${
                  cottageType === "" ? "is-invalid-villa" : ""
                }`}
                value={cottageType}
                onChange={handleSelectChange}
                disabled={isEditing}
              >
                <option value="" disabled>
                  Выберите коттедж
                </option>
                {(availabilityState.riviera > 0 || isEditing) && (
                  <option value="riviera">Ривьера</option>
                )}
                {(availabilityState.grandis > 0 || isEditing) && (
                  <option value="grandis">Грандис</option>
                )}
              </select>
            </div>
            <div className="form-group" ref={dropdownRef}>
              <div className="dropdown-button" onClick={toggleCheckboxes}>
                Дополнительные опции
              </div>

              <div
                className={`dropdown-menu ${showCheckboxes ? "" : "hidden"}`}
              >
                {[
                  "мангал",
                  "квадроцикл",
                  "эндуро",
                  "снегоход",
                  "собака",
                  "самовар",
                  "ранний заезд",
                  "поздний заезд",
                  "ранний выезд",
                  "поздний выезд",
                ].map((option) => (
                  <div key={option} className="checkbox-item">
                    <label className={"checkbox-item-label"}>
                      <input
                        className={"checkbox-item-input"}
                        type="checkbox"
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={handleCheckboxChange}
                      />
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className={"form-group-group"}>
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
                    value={adults}
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
                    value={children}
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
            </div>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                {...register("name")}
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Ваше имя"}
              />
            </div>
            <div className={"form-group-group"}>
              <div className="form-group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  {...register("phone", errorPhone)}
                  className={`form-control ${
                    errors["phone"] ? "is-invalid" : ""
                  }`}
                  placeholder="+7 999 888 77 66"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", errorEmail)}
                  className={`form-control ${
                    errors["email"] ? "is-invalid" : ""
                  }`}
                  placeholder="email@gmail.com"
                />
              </div>
            </div>
            <button
              type="submit"
              className={`submit-button ${
                isEditing
                  ? false
                  : !isValid || !availabilityStateButton
                    ? "submit-button-disable"
                    : ""
              }`}
              disabled={
                isEditing ? false : !isValid || !availabilityStateButton
              }
            >
              {initialBooking ? "Сохранить изменения" : "Создать"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingPopup;
