import { formConfig as fc } from "./config.js";

export function getFormInputValues(form) {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  return formProps;
}

export function getErrorElement(form, input) {
  return form.querySelector(`.${input.id}-error`);
}

export function getFormInputs(form) {
  return Array.from(form.querySelectorAll(fc.inputSelector));
}
