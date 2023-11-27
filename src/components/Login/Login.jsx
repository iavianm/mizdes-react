import "./Login.css";
import LoginRegisterForm from "../LoginRegisterForm/LoginRegisterForm";
import Input from "../Input/Input";
import AuthForm from "../AuthForm/AuthForm";
function Login(props) {
  const { register, errors, isValid, handleSubmit, reset } = AuthForm();
  return (
    <section className={"login"}>
      <LoginRegisterForm
        buttonText={"Войти"}
        title={"Рады видеть!"}
        path={"/signup"}
        handleSubmit={handleSubmit}
        reset={reset}
        isValid={isValid}
        handleLoginRegister={props.handleLogin}
        message={props.message}
      >
        <Input
          text={"E-mail"}
          label={"email"}
          type={"email"}
          name="email"
          register={register}
          errors={errors}
        />
        <Input
          text={"Пароль"}
          label={"password"}
          type={"password"}
          name="password"
          register={register}
          errors={errors}
        />
      </LoginRegisterForm>
    </section>
  );
}

export default Login;
