import variables from '../styles/modules/abstract/variables.module.scss';

import {
  getErrorElement,
  getFormInputs,
  setButtonState,
} from '../utils/utils.js';

export class Validate {
  #formValidateSelector;
  #formFieldSelector;
  #submitButtonSelector;
  #inputErrorClass;
  #errorTemplate;
  #errorElementSelector;
  #errorElementClassActive;

  constructor(formSelector, config) {
    this.#formValidateSelector = formSelector;
    this.#formFieldSelector = config.formFieldSelector;
    this.#submitButtonSelector = config.submitButtonSelector;
    this.#inputErrorClass = config.inputErrorClass;
    this.#errorTemplate = document.querySelector(
      config.errorElementTemplateId,
    ).content;
    this.#errorElementSelector = config.errorElementSelector;
    this.#errorElementClassActive = config.errorElementClassActive;
  }

  enableValidation() {
    const form = document.querySelector(this.#formValidateSelector);
    this.#setFormEventListeners(form);
  }

  #setFormEventListeners(form) {
    const inputs = getFormInputs(form);
    const submitButton = form.querySelector(this.#submitButtonSelector);

    setButtonState(submitButton, this.isFormValid(form));
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.#handleFormInput(form, input);
        setButtonState(submitButton, this.isFormValid(form));
      });
    });
  }

  #handleFormInput(form, input) {
    const errorElement = input.parentNode.querySelector(
      this.#errorElementSelector,
    );

    input.validity.patternMismatch
      ? input.setCustomValidity(input.dataset.errorMessage)
      : input.setCustomValidity('');

    if (!input.validity.valid) {
      if (!errorElement) {
        const errorElement = this.#generateErrorElement(input);
        input.parentNode.insertBefore(errorElement, input.nextSibling);
      }

      this.#showInputError(form, input, input.validationMessage);
    } else {
      if (errorElement) {
        this.#hideInputError(input);
      }
    }
  }

  #generateErrorElement(input) {
    const errorElement = this.#errorTemplate
      .querySelector(this.#errorElementSelector)
      .cloneNode(true);

    errorElement.classList.add(`${input.id}-error`);

    return errorElement;
  }

  #showInputError(form, input, message) {
    const errorElement = getErrorElement(form, input);
    errorElement.textContent = message;

    const formField = errorElement.closest(this.#formFieldSelector);

    // if err text too high for fixed .form__field spacing
    const fieldMarginBottom = Number(variables.formFieldMarginBottom);

    if (errorElement.offsetHeight > fieldMarginBottom) {
      errorElement.style.position = 'initial';
      formField.style.marginBottom = 0;
    }

    input.setAttribute('aria-describedby', `${input.id}-error`);
    input.classList.add(this.#inputErrorClass);
    errorElement.classList.add(this.#errorElementClassActive);
  }

  #hideInputError(input) {
    const formField = input.parentNode;
    formField.removeAttribute('style');

    const errorElement = formField.querySelector(this.#errorElementSelector);
    if (errorElement) {
      errorElement.removeAttribute('style');
      errorElement.classList.remove(this.#errorElementClassActive);
      errorElement.textContent = '';
      errorElement.remove();
    }

    input.removeAttribute('aria-describedby');
    input.classList.remove(this.#inputErrorClass);
  }

  isFormValid(form) {
    const inputs = getFormInputs(form);
    return inputs.every((input) => {
      return input.validity.valid;
    });
  }
}
