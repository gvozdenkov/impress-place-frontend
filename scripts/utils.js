export function resetFormAndClosePopup(evt) {
  evt.target.reset();
  closePopup(evt.target.closest(".popup_opened"));
}

export function getFormInputValues(form) {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  return formProps;
}