import {
  popupOpenedClass,
  popupOpenedSelector,
  popupCloseBtnClass,
  formSelector,
} from '../utils/constants.js';

function openPopup(popup) {
  popup.classList.add(popupOpenedClass);

  return new Promise((res, rej) => {
    // handle submit event
    const form = popup.querySelector(formSelector);

    if (form) {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        res(true);
      });
    }

    // close popup with button or overlay
    document.addEventListener(
      'mousedown',
      (evt) => {
        const classList = evt.target.classList;
        if (
          classList.contains(popupCloseBtnClass) ||
          classList.contains(popupOpenedClass)
        ) {
          closeAllPopups();
          res(false);
        }
      },
      { once: true }
    );

    // close poupup with ESC
    document.addEventListener(
      'keydown',
      (evt) => {
        if (evt.key === 'Escape') {
          closeAllPopups();
          res(false);
        }
      },
      { once: true }
    );
  });
}

function closeAllPopups() {
  const popups = document.querySelectorAll(popupOpenedSelector);
  popups.forEach((pop) => {
    pop.classList.contains(popupOpenedClass)
      ? pop.classList.remove(popupOpenedClass)
      : null;
  });
}

export { openPopup, closeAllPopups };
