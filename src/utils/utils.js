import { validationConfig } from "./config.js";

export function getFormInputValues(form) {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  return formProps;
}

export function getErrorElement(form, input) {
  return form.querySelector(`.${input.id}-error`);
}

export function getFormInputs(form) {
  return Array.from(form.querySelectorAll(validationConfig.inputSelector));
}

export function hideAllInputErrors(form) {
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    const errorElement = getErrorElement(form, input);
    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  });
}

export function setButtonState(button, isFormValid) {
  if (isFormValid) {
    button.removeAttribute("disabled");
    button.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    button.setAttribute("disabled", true);
    button.classList.add(validationConfig.inactiveButtonClass);
  }
}

export function getPopupElement(button) {
  const popupSelector = `.${button.dataset.popup}`;
  return document.querySelector(popupSelector);
}
