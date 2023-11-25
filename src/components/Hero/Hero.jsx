import "./Hero.css";

function Hero({ content = {} }) {
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
        <a href={buttonLink} className="btn btn-primary">
          {buttonText}
        </a>
      </div>
    </section>
  );
}

export default Hero;
