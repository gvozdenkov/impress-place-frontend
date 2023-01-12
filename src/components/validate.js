import { errorTemplate } from "../utils/constants.js";

import {
  getErrorElement,
  getFormInputs,
  setButtonState,
} from "../utils/utils.js";

import { validationConfig } from "../utils/config.js";

export function enableValidation(validationConfig) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formValidateSelector)
  );
  forms.forEach((form) => setFormEventListeners(form));

  function showInputError(form, input, message) {
    const errorElement = getErrorElement(form, input);
    errorElement.textContent = message;
    errorElement.classList.add(validationConfig.errorElementClassActive);

    input.classList.add(validationConfig.inputErrorClass);
    input.setAttribute("aria-describedby", `${input.id}-error`);
  }

  function hideInputError(form, input) {
    const errorElement = getErrorElement(form, input);

    input.classList.remove(validationConfig.inputErrorClass);
    input.removeAttribute("aria-describedby");

    errorElement.classList.remove(validationConfig.errorElementClassActive);
    errorElement.textContent = "";
  }

  function handleFormInput(form, input) {
    const errorElement = input.parentNode.querySelector(
      validationConfig.errorElementSelector
    );

    input.validity.patternMismatch
      ? input.setCustomValidity(input.dataset.errorMessage)
      : input.setCustomValidity("");

    if (!input.validity.valid) {
      // if no error element -> create error DOM node and then show
      if (!errorElement) {
        const errorElement = generateErrorForInput(input);
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }

      showInputError(form, input, input.validationMessage);
    } else {
      if (errorElement) {
        hideInputError(form, input);
      }
    }
  }

  function setFormEventListeners(form) {
    const inputs = getFormInputs(form);
    const submitButton = form.querySelector(
      validationConfig.submitButtonSelector
    );

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        handleFormInput(form, input);
        setButtonState(submitButton, isFormValid(form));
      });
    });
  }
}

export function isFormValid(form) {
  const inputs = getFormInputs(form);
  return inputs.every((input) => input.validity.valid);
}

function generateErrorForInput(input) {
  const errorElement = errorTemplate
    .querySelector(validationConfig.errorElementSelector)
    .cloneNode(true);

  errorElement.classList.add(`${input.id}-error`);

  return errorElement;
}
