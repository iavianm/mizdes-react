import "./NotFound.css";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className={"notfound"}>
      <h1 className={"notfound__title"}>404</h1>
      <p className={"notfound__text"}>Страница не найдена</p>
      <button className="notfound__link-enter" onClick={goBack}>
        Назад
      </button>
    </section>
  );
}

export default NotFound;
