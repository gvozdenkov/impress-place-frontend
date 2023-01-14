const validationConfig = {
  formValidateSelector: ".validate",
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  errorElementSelector: ".form__input-error",
  errorElementClassActive: "form__input-error_active",
};

const serverConfig = {
  baseUrl: `${process.env.HOST}/v1/${process.env.GROUP_ID}`,
  headers: {
    authorization: process.env.ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
};

export { validationConfig, serverConfig };
