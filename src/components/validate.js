import { errorTemplate } from '../utils/constants.js';
import variables from '../styles/modules/abstract/variables.module.scss';

import {
  getErrorElement,
  getFormInputs,
  setButtonState,
} from '../utils/utils.js';

import { validationConfig } from '../utils/config.js';

export function enableValidation(validationConfig) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formValidateSelector),
  );
  forms.forEach((form) => setFormEventListeners(form));

  function showInputError(form, input, message) {
    const errorElement = getErrorElement(form, input);
    errorElement.textContent = message;

    const formField = errorElement.closest(validationConfig.formFieldSelector);

    // if err text too high for fixed .form__field spacing
    const fieldMarginBottom = Number(variables.formFieldMarginBottom);

    if (errorElement.offsetHeight > fieldMarginBottom) {
      errorElement.style.position = 'initial';
      formField.style.marginBottom = 0;
    }

    input.setAttribute('aria-describedby', `${input.id}-error`);
    input.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorElementClassActive);
  }

  function handleFormInput(form, input) {
    const errorElement = input.parentNode.querySelector(
      validationConfig.errorElementSelector,
    );

    input.validity.patternMismatch
      ? input.setCustomValidity(input.dataset.errorMessage)
      : input.setCustomValidity('');

    if (!input.validity.valid) {
      // if no error element -> create error DOM node and then show
      if (!errorElement) {
        const errorElement = generateErrorForInput(input);
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }

      showInputError(form, input, input.validationMessage);
    } else {
      if (errorElement) {
        hideInputError(input);
      }
    }
  }

  function setFormEventListeners(form) {
    const inputs = getFormInputs(form);
    const submitButton = form.querySelector(
      validationConfig.submitButtonSelector,
    );

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        handleFormInput(form, input);
        setButtonState(submitButton, isFormValid(form));
      });
    });
  }
}

function hideInputError(input) {
  const formField = input.parentNode;
  formField.removeAttribute('style');

  const errorElement = formField.querySelector(
    validationConfig.errorElementSelector,
  );
  if (errorElement) {
    errorElement.removeAttribute('style');
    errorElement.classList.remove(validationConfig.errorElementClassActive);
    errorElement.textContent = '';
    errorElement.remove();
  }

  input.removeAttribute('aria-describedby');
  input.classList.remove(validationConfig.inputErrorClass);
}

export function isFormValid(form) {
  const inputs = getFormInputs(form);
  return inputs.every((input) => input.validity.valid);
}

export function removeInputErrors(form) {
  const inputs = getFormInputs(form);

  inputs.forEach((input) => hideInputError(input));
}

function generateErrorForInput(input) {
  const errorElement = errorTemplate
    .querySelector(validationConfig.errorElementSelector)
    .cloneNode(true);

  errorElement.classList.add(`${input.id}-error`);

  return errorElement;
}
