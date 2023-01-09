import { popupConfig as pc } from "./config.js";

const openPopup = (popup) => {
  popup.classList.add(pc.popupOpenedClass);
};

const closePopup = (popup) => {
  popup.classList.remove(pc.popupOpenedClass);
};

const setPopupCloseListeners = () => {
  document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains(pc.popupCloseButtonClass)) {
      const openedPopup = evt.currentTarget.querySelector(pc.popupOpenedSelector);
      closePopup(openedPopup);
    }
  });

  document.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains(pc.popupOpenedClass)) {
      closePopup(evt.target);
    }
  });

  document.addEventListener("keydown", (evt) => {
    const openedPopup = document.querySelector(pc.popupOpenedSelector);

    if (openedPopup && evt.key === "Escape") {
      closePopup(openedPopup);
    }
  });
};

export { openPopup, closePopup, setPopupCloseListeners };
