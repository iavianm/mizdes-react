import "./Hero.css";
import { Link } from "react-router-dom";

function Hero({ content = {}, handleTogglePopup }) {
  const {
    title,
    subtitle,
    description,
    features,
    buttonText,
    buttonLink,
    featureIconSrc,
  } = content;

  return (
    <section className="hero-section">
      <div className="hero-opacity"></div>
      <div className="hero-content">
        <h3 className="hero__ftitle">{title}</h3>
        <h1 className="hero__title">{subtitle}</h1>
        <p className="hero__description">{description}</p>
        <ul className="hero__features">
          {features.map((feature, index) => (
            <li key={index} className="hero__features_item">
              <img src={featureIconSrc} alt="" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to={buttonLink}
          onClick={handleTogglePopup}
          className="btn btn-primary"
          type={"button"}
        >
          {buttonText}
        </Link>
      </div>
      
    </section>
  );
}

export default Hero;
