import "./DevelopContent.css";

export default function DevelopContent({ content }) {
  const { title, subtitle, items } = content;

  return (
    <div className="dev">
      <h2 className="dev__title">{title}</h2>
      <div className="dev__content">
        <p className="dev__subtitle">{subtitle}</p>
        <div className="dev__options">
          {items.map((item, index) => (
            <span key={index} className={"dev__option"}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
