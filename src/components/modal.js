import {
  popupOpenedClass,
  popupOpenedSelector,
  popupCloseBtnClass,
  formSelector,
} from '../utils/constants.js';

function openPopup(popup) {
  popup.classList.add(popupOpenedClass);
  setPopupCloseListeners();
}

function openedPopupWithForm(popup, handleSubmit) {
  openPopup(popup);
  const form = popup.querySelector(formSelector);
  form.addEventListener('submit', handleSubmit);
}

function closePopup(popup) {
  removePopupCloseListeners();
  popup.classList.remove(popupOpenedClass);
}

function closePopupWithForm(popup, handleSubmit) {
  const form = popup.querySelector(formSelector);
  form.removeEventListener('submit', handleSubmit);
  closePopup(popup);
}
// ===============================

const handlePopupCloseClick = (evt) => {
  const classList = evt.target.classList;
  if (
    classList.contains(popupCloseBtnClass) ||
    classList.contains(popupOpenedClass)
  ) {
    const openedPopup = document.querySelector(popupOpenedSelector);
    closePopup(openedPopup);
    removePopupCloseListeners();
  }
};

const handlePopupCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(popupOpenedSelector);
    closePopup(openedPopup);
  }
};

function setPopupCloseListeners() {
  document.addEventListener('mousedown', handlePopupCloseClick);
  document.addEventListener('keydown', handlePopupCloseEsc);
}

function removePopupCloseListeners() {
  document.removeEventListener('mousedown', handlePopupCloseClick);
  document.removeEventListener('keydown', handlePopupCloseEsc);
}

export { openPopup, openedPopupWithForm, closePopup, closePopupWithForm };
