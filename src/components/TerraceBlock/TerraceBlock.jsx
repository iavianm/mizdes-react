import "./TerraceBlock.css";
import BookingPopup from "../BookingPopup/BookingPopup.jsx";
import { useState } from "react";

const TerraceBlock = () => {
  const [openPopup, setOpenPopup] = useState(false);

  function handleTogglePopup() {
    setOpenPopup(!openPopup);
  }
  return (
    <>
      {" "}
      <div className="terrace-block">
        <div className="terrace-container">
          <h3 className="terrace-subtitle">На каждой вилле</h3>
          <h2 className="terrace-title">
            Терраса - идеальное место для отдыха
          </h2>
          <p className="terrace-description">
            На каждой вилле На просторной террасе можно отдыхать в уютных
            шезлонгах и загорать, готовить ужин в барбекю, не боясь жары, дождя
            и ветра, или, укутавшись в плед, пить чай и наслаждаться окружающей
            природой.
          </p>
          <button className="book-button" onClick={handleTogglePopup}>
            Забронировать
          </button>
        </div>
      </div>
      <BookingPopup
        isVisible={openPopup}
        handleTogglePopup={handleTogglePopup}
      />
    </>
  );
};

export default TerraceBlock;
