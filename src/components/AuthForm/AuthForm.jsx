import { useForm } from "react-hook-form";

const AuthForm = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    control,
    getValues,
    setError,
  } = useForm({
    mode: "onChange",
  });

  return {
    register,
    errors,
    isValid,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    control,
    getValues,
    setError,
  };
};

export default AuthForm;
