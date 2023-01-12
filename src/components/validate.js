import { formConfig as fc } from "../utils/config.js";
import { getErrorElement, getFormInputs } from "../utils/utils.js";

function showInputError(form, input, message) {
  const errorElement = getErrorElement(form, input);

  input.classList.add(form.inputErrorClass);
  errorElement.textContent = message;
  errorElement.classList.add(fc.errorClass);
}

function hideInputError(form, input) {
  const errorElement = getErrorElement(form, input);

  input.classList.remove(fc.inputErrorClass);
  errorElement.classList.remove(fc.errorClass);
  errorElement.textContent = "";
}

function hideAllInputErrors(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    const errorElement = getErrorElement(form, input);
    input.classList.remove(fc.inputErrorClass);
    errorElement.classList.remove(fc.errorClass);
    errorElement.textContent = "";
  });
}

function isFormValid(form) {
  const inputs = getFormInputs(form);
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
  const inputs = getFormInputs(form);
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

export { enableValidation, setButtonState, hideAllInputErrors };
