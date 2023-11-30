import "./LeisureBlock.css";
import { features } from "../../content/leisureContent.json";

const LeisureBlock = () => {
  return (
    <div className="leisureBlock">
      <h2>Активный отдых</h2>
      <p className="subtitle">
        «Мы здесь» — это не только вдохновляющая история релакса
      </p>
      <div className="featuresList">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <img
              src={feature.imageSrc}
              alt={feature.title}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <h3>{feature.title}</h3>
            <p>{feature.size}</p>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeisureBlock;
