const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
};

const setPopupCloseListeners = () => {
  document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup__close-btn")) {
      const openedPopup = evt.currentTarget.querySelector(".popup_opened");
      closePopup(openedPopup);
    }
  });

  document.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(evt.target);
    }
  });

  document.addEventListener("keydown", (evt) => {
    const openedPopup = document.querySelector(".popup_opened");

    if (openedPopup && evt.key === "Escape") {
      closePopup(openedPopup);
    }
  });
};

export { openPopup, closePopup, setPopupCloseListeners };
