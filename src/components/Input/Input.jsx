import "./Input.css";
import { errorEmail, errorName, errorPass } from "../InputErrors/InputErrors";

function Input(props) {
  function checkErrorName(error) {
    if (error === "name") {
      return errorName;
    } else if (error === "email") {
      return errorEmail;
    } else if (error === "password") {
      return errorPass;
    }
  }

  return (
    <>
      <label className={"input__label"} htmlFor={props.label}>
        {props.text}
      </label>
      <input
        className={`input ${
          props.errors[props.name] ? "input__border-red input__text-red" : ""
        }`}
        id={props.label}
        type={props.type}
        name={props.name}
        {...props.register(props.name, checkErrorName(props.name))}
        required
        autoComplete="off"
      />
      <span
        className={`input__error ${props.errors ? "input__error-show" : ""}`}
      >
        {props.errors ? props.errors[props.name]?.message || "" : ""}
      </span>
    </>
  );
}

export default Input;
