import Image from "next/image";

function TourPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="popup-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="popup-header">
          <h2 className="popup-title">Терраса - идеальное место для отдыха</h2>
          <p className="popup-description">
            На просторной террасе можно отдыхать в уютных шезлонгах и загорать,
            готовить ужин в барбекю, не боясь жары, дождя и ветра, или,
            укутавшись в плед, пить чай и наслаждаться окружающей природой.
          </p>
          <button className="popup-book-button">Забронировать</button>
        </div>
        <div className="popup-body">
          <div>
            <Image
              src="/images/-130--_1.svg"
              alt="Схема дома"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div>
            <Image
              src="/images/-130--_2.svg"
              alt="Схема второго этажа дома"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourPopup;
