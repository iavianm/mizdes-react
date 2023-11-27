import "./LoginRegisterForm.css";

function LoginRegisterForm(props) {
  const onSubmit = (data) => {
    props.handleLoginRegister(data);
    // props.reset();
  };

  return (
    <div className={"forms"}>
      <h3 className={"forms__title"}>{props.title}</h3>
      <form
        className={"form"}
        onSubmit={props.handleSubmit(onSubmit)}
        noValidate
      >
        <div className={"form__body"}>{props.children}</div>

        <span className={"form__error-message"}>{props.message}</span>
        <button
          className={`form__button ${
            !props.isValid ? "form__button-disable" : ""
          }`}
          type={"submit"}
          disabled={!props.isValid}
        >
          {props.buttonText}
        </button>
      </form>
    </div>
  );
}

export default LoginRegisterForm;
