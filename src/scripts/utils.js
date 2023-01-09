import { popupConfig as pc } from "./config.js";

export function resetFormAndClosePopup(evt) {
  evt.target.reset();
  closePopup(evt.target.closest(pc.popupOpenedSelector));
}

export function getFormInputValues(form) {
  const formData = new FormData(form);
  const formProps = Object.fromEntries(formData);
  return formProps;
}
