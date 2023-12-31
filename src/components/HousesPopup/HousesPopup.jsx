import housesPopupContent from "../../content/housesPopupContent.json";
import "./HousesPopup.css";

export default function HousesPopup({
  isVisiblie,
  selectedHouse,
  onClose,
  handleTogglePopup,
  handleChangeVillas,
}) {
  const { scheme, option, items, texts, quantity } =
    housesPopupContent[selectedHouse] || housesPopupContent["riviera"];

  const handleButtonClick = () => {
    handleTogglePopup();
    handleChangeVillas(selectedHouse);
    onClose();
  };

  return (
    <div className={`popup-overlay ${isVisiblie ? "popup-open" : ""}`}>
      <div className={`popup-block ${isVisiblie ? "popup-open" : ""}`}>
        <button className="popup-btn-close" onClick={onClose}>
          <img src={"/images/close-icon.svg"} alt="Close" />
        </button>
        <div className="popup-container">
          <div className="popup-schemes">
            {scheme.map((img, index) => (
              <img
                key={index}
                className="popup-scheme"
                src={img}
                alt={`Scheme ${index + 1}`}
              />
            ))}
          </div>
          <div className="popup-content">
            <div className="popup-options">
              {option.map((opt, index) => (
                <img
                  key={index}
                  className="popup-option"
                  src={opt}
                  alt={`Option ${index + 1}`}
                />
              ))}
            </div>
            <div className="popup-items">
              {items.map((item, index) => (
                <span key={index} className={"popup-item"}>
                  {item}
                </span>
              ))}
            </div>
            <div className="popup-texts">
              {texts.map((text, index) => (
                <p key={index} className={"popup-text"}>
                  {text}
                </p>
              ))}
            </div>
            <div className="popup-quantitys">
              <span className="popup-quantity">{quantity}</span>
            </div>
            <button className="popup-btn" onClick={handleButtonClick}>
              Забронировать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
