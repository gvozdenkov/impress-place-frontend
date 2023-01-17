import {
  popupOpenedClass,
  popupOpenedSelector,
  popupCloseBtnClass,
} from "../utils/constants.js";

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

  if (openedPopup && evt.key === "Escape") {
    closePopup(openedPopup);
  }
};

function setPopupCloseListeners() {
  document.addEventListener("mousedown", handlePopupCloseClick);
  document.addEventListener("keydown", handlePopupCloseEsc);
}

function removePopupCloseListeners() {
  document.removeEventListener("mousedown", handlePopupCloseClick);
  document.removeEventListener("keydown", handlePopupCloseEsc);
}

// =========== confirm delete popup

function openConfirmPopup(popup) {
  openPopup(popup);
  setConfirmPopupCloseListeners();
}

function closeConfirmPopup(popup) {
  closePopup(popup);
  removeConfirmPopupCloseListeners();
}

function setConfirmPopupCloseListeners() {
  
}

function removeConfirmPopupCloseListeners() {

}

export { openPopup, closePopup, openConfirmPopup, closeConfirmPopup };
