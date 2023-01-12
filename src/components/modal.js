import {
  popupOpenedClass,
  popupOpenedSelector,
  popupCloseBtnClass,
} from "../utils/constants.js";

function openPopup(popup) {
  popup.classList.add(popupOpenedClass);
}

function closePopup(popup) {
  popup.classList.remove(popupOpenedClass);
}

function setPopupCloseListeners() {
  document.addEventListener("mousedown", (evt) => {
    const classList = evt.target.classList;
    if (
      classList.contains(popupCloseBtnClass) ||
      classList.contains(popupOpenedClass)
    ) {
      const openedPopup = document.querySelector(popupOpenedSelector);
      closePopup(openedPopup);
    }
  });

  document.addEventListener("keydown", (evt) => {
    const openedPopup = document.querySelector(popupOpenedSelector);

    if (openedPopup && evt.key === "Escape") {
      closePopup(openedPopup);
    }
  });
}

export { openPopup, closePopup, setPopupCloseListeners };
