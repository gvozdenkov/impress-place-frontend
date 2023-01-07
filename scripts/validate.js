function showInputError(form, input, message) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add("form__input_type_error");
  errorElement.textContent = message;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

function isFormValid(form) {
  const inputs = Array.from(form.querySelectorAll(".form__input"));
  return inputs.every((input) => input.validity.valid);
}

function setButtonState(button, isFormValid) {
  if (isFormValid) {
    button.removeAttribute("disabled");
    button.classList.remove("button_disabled");
  } else {
    button.setAttribute("disabled", true);
    button.classList.add("button_disabled");
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
  const inputs = Array.from(form.querySelectorAll(".form__input"));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input);

      const submitButton = form.querySelector(".form__submit");
      setButtonState(submitButton, isFormValid(form));
    });
  });
}

function enableValidation() {
  const forms = Array.from(document.querySelectorAll(".form"));
  forms.forEach((form) => setFormEventListeners(form));
}

export { enableValidation, setButtonState };
