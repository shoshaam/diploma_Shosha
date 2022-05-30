export const formInputsSignIn = [
  {
    type: "text",
    value: "",
    name: "login",
    label: "Логин",
    check: "isEmpty",
    valid: false
  },
  {
    type: "password",
    value: "",
    name: "password",
    label: "Пароль",
    check: "isPassword",
    valid: false
  },
];

export const formInputsSignUp = [
  {
    type: "text",
    value: "",
    name: "login",
    label: "*Логин",
    check: "isEmpty",
    valid: false
  },
  {
    type: "password",
    value: "",
    name: "password",
    label: "*Пароль",
    check: "isPassword",
    valid: false
  },
  {
    type: "text",
    value: "",
    name: "fullname",
    label: "*Полное имя",
    check: "isEmpty",
    valid: false
  },
  {
    type: "date",
    value: "",
    name: "birth_date",
    label: "Дата рождения",
    check: "notCheck",
    valid: true
  },
  {
    type: "text",
    value: "",
    name: "city",
    label: "Город",
    check: "notCheck",
    valid: true
  },
];

