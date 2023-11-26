import "./Preloader.css";
import { useEffect } from "react";

function Preloader(props) {
  // useEffect(() => {
  //   props.setUseMessage("");
  // }, [props.location]);

  return (
    <div
      className={`preloader ${props.openPreloader ? "preloader_active" : ""}`}
    >
      <div className="preloader__container">
        <span className="preloader__round" />
      </div>
    </div>
  );
}

export default Preloader;
