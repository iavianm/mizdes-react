export const errorName = {
  type: String,
  required: "Обязательное поле",
  minLength: {
    value: 2,
    message: "Минимальное кол-во символов: 2",
  },
  pattern: {
    value: /^\S*$/,
    message: "Поле не должно содержать пробелов",
  },
};

export const errorEmail = {
  type: String,
  required: "Обязательное поле",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    message: "Некорректный E-mail",
  },
};

export const errorPass = {
  type: String,
  required: "Обязательное поле",
  minLength: {
    value: 6,
    message: "Минимальное кол-во символов: 6",
  },
  pattern: {
    value: /^\S*$/,
    message: "Поле не должно содержать пробелов",
  },
};
