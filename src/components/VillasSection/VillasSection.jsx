import VillaCard from "../VillaCard/VillaCard.jsx";
import "./VillasSection.css";

const VillasSection = ({ villas, about }) => {
  return (
    <section className="villas-section">
      <h2>{about.title}</h2>
      <p>{about.subtitle}</p>
      <div className={"villasGrid"}>
        {villas.map((villa, index) => (
          <VillaCard key={index} {...villa} />
        ))}
      </div>
    </section>
  );
};

export default VillasSection;
