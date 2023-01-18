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

function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);
  removePopupCloseListeners();
}

const handlePopupCloseClick = (evt) => {
  const classList = evt.target.classList;
  if (
    classList.contains(popupCloseBtnClass) ||
    classList.contains(popupOpenedClass)
  ) {
    const openedPopup = document.querySelector(popupOpenedSelector);
    closePopup(openedPopup);
  }
};

const handlePopupCloseEsc = (evt) => {
  const openedPopup = document.querySelector(popupOpenedSelector);

  if (openedPopup && evt.key === 'Escape') {
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

// =========== confirm delete popup

function openConfirmPopup(popup, collbackConfirmSubmit) {
  popup.classList.add(popupOpenedClass);
  setConfirmCloseListeners(popup, collbackConfirmSubmit);
}

function closeConfirmPopup(popup, collbackConfirmSubmit) {
  popup.classList.remove(popupOpenedClass);
  removeConfirmCloseListeners(popup, collbackConfirmSubmit);
}

function setConfirmCloseListeners(popup, collbackConfirmSubmit) {
  document.addEventListener('mousedown', (evt) =>
    handleConfirmPopupCloseClick(evt, popup, collbackConfirmSubmit)
  );
  document.addEventListener('keydown', (evt) =>
    handleConfirmPopupCloseEsc(evt, popup, collbackConfirmSubmit)
  );
}

function removeConfirmCloseListeners(popup, collbackConfirmSubmit) {
  document.removeEventListener('mousedown', () =>
    handleConfirmPopupCloseClick(popup, collbackConfirmSubmit)
  );
  document.removeEventListener('keydown', () =>
    handleConfirmPopupCloseEsc(popup, collbackConfirmSubmit)
  );
}

function handleConfirmPopupCloseClick(evt, popup, collbackConfirmSubmit) {
  const classList = evt.target.classList;
  if (
    classList.contains(popupCloseBtnClass) ||
    classList.contains(popupOpenedClass)
  ) {
    popup
      .querySelector(formSelector)
      .removeEventListener('submit', collbackConfirmSubmit);
    closeConfirmPopup(popup);
  }
}

function handleConfirmPopupCloseEsc(evt, popup, collbackConfirmSubmit) {
  if (popup && evt.key === 'Escape') {
    popup
      .querySelector(formSelector)
      .removeEventListener('submit', collbackConfirmSubmit);
    closeConfirmPopup(popup);
  }
}

export { openPopup, closePopup, openConfirmPopup, closeConfirmPopup };
