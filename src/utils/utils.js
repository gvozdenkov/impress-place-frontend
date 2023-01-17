import { validationConfig } from "./config.js";

import {
  ellipsisClass,
  ellipsisContainerSelector,
  submitButtonTextSelector,
} from "./constants.js";

export function getFormInputValues(form) {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  return formProps;
}

export function getErrorElement(form, input) {
  return form.querySelector(`.${input.id}-error`);
}

export function getFormInputs(form) {
  const inputs = Array.from(form.querySelectorAll("input"));

  const inputsForValidate = inputs.filter((input) => {
    return (
      !input.disabled &&
      input.type !== "file" &&
      input.type !== "reset" &&
      input.type !== "submit" &&
      input.type !== "button"
    );
  });

  return inputsForValidate;
}

export function removeInputErrors(form) {
  const inputs = getFormInputs(form);

  inputs.forEach((input) => {
    const errorElement = getErrorElement(form, input);
    if (errorElement) {
      errorElement.remove();
    }
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

export function showButtonLoadingEllipsis(button, text) {
  const submitButtonText = button.querySelector(submitButtonTextSelector);
  const loadingEllipsis = button.querySelector(ellipsisContainerSelector);
  submitButtonText.textContent = text;
  loadingEllipsis.classList.add(ellipsisClass);
}

export function hideButtonLoadingEllipsis(button, text) {
  const submitButtonText = button.querySelector(submitButtonTextSelector);
  const loadingEllipsis = button.querySelector(ellipsisContainerSelector);
  submitButtonText.textContent = text;
  loadingEllipsis.classList.remove(ellipsisClass);
}

export function getPopupElement(button) {
  const popupSelector = `.${button.dataset.popup}`;
  return document.querySelector(popupSelector);
}

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onerror = () => reject(url);
    img.onload = () => resolve(url);
  });
}

export function confirmSubmit(form) {
  return new Promise((res, rej) => {
    
  })
}