import { useState } from "react";
import "./InteractiveMap.css";
import { points } from "../../content/interactiveMapPoints.json";

const InteractiveMap = () => {
  const [activePoint, setActivePoint] = useState(null);

  return (
    <div className="mapContainer">
      <div className={"interactive-map-container"}>
        <img
          src="/images/interactive-map.png"
          alt="Интерактивная карта"
          className={"interactive-map"}
        />
      </div>

      {points.map((point) => (
        <div
          key={point.id}
          className="point-container"
          onMouseEnter={() => setActivePoint(point.id)}
          onMouseLeave={() => setActivePoint(null)}
          style={{ top: point.top, left: point.left }}
        >
          <div className="point" />
          {activePoint === point.id && (
            <a href={point.link} className="moreLink">
              <div className="tooltip">
                <img
                  src={point.image}
                  alt={point.label}
                  style={{
                    width: "300px",
                    height: "160px",
                    objectFit: "cover",
                  }}
                />
                <div className="tooltipText">{point.label}</div>
              </div>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default InteractiveMap;
