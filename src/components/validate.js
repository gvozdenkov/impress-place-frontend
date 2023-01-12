import {
  getErrorElement,
  getFormInputs,
  setButtonState,
} from "../utils/utils.js";

export function enableValidation(validationConfig) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formValidateSelector)
  );
  forms.forEach((form) => setFormEventListeners(form));

  function showInputError(form, input, message) {
    const errorElement = getErrorElement(form, input);

    input.classList.add(form.inputErrorClass);
    errorElement.textContent = message;
    errorElement.classList.add(validationConfig.errorClass);
  }

  function hideInputError(form, input) {
    const errorElement = getErrorElement(form, input);

    input.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
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

        const submitButton = form.querySelector(
          validationConfig.submitButtonSelector
        );
        setButtonState(submitButton, isFormValid(form));
      });
    });
  }
}

export function isFormValid(form) {
  const inputs = getFormInputs(form);
  return inputs.every((input) => input.validity.valid);
}
