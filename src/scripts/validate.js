import { formConfig as fc } from "./config.js";

function showInputError(form, input, message) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(form.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(fc.errorClass);
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(fc.inputErrorClass);
  errorElement.classList.remove(fc.errorClass);
  errorElement.textContent = "";
}

function isFormValid(form) {
  const inputs = Array.from(form.querySelectorAll(fc.inputSelector));
  return inputs.every((input) => input.validity.valid);
}

function setButtonState(button, isFormValid) {
  if (isFormValid) {
    button.removeAttribute("disabled");
    button.classList.remove(fc.inactiveButtonClass);
  } else {
    button.setAttribute("disabled", true);
    button.classList.add(fc.inactiveButtonClass);
  }
}

function isValid(form, input) {
  input.validity.patternMismatch
    ? input.setCustomValidity(input.dataset.errorMessage)
    : input.setCustomValidity("");

  !input.validity.valid
    ? showInputError(form, input, input.validationMessage)
    : hideInputError(form, input);
}

function setFormEventListeners(form) {
  const inputs = Array.from(form.querySelectorAll(fc.inputSelector));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input);

      const submitButton = form.querySelector(fc.submitButtonSelector);
      setButtonState(submitButton, isFormValid(form));
    });
  });
}

function enableValidation(fc) {
  const forms = Array.from(document.querySelectorAll(fc.formSelector));
  forms.forEach((form) => setFormEventListeners(form));
}

export { enableValidation, setButtonState };
