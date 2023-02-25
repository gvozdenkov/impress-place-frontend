import { popupCloseBtnClass, popupOpenedClass } from '../utils/constants.js';

export class Popup {
  #popup;

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  open() {
    this.#popup.classList.add(popupOpenedClass);
    document.addEventListener('keyup', this.#handlePopupCloseEsc);
  }

  getPopupElement() {
    return this.#popup;
  }

  setEventListeners() {
    this.#popup.addEventListener('mousedown', this.#handlePopupCloseClick);
  }

  #handlePopupCloseClick = (evt) => {
    const classList = evt.target.classList;
    const closeCondition =
      classList.contains(popupCloseBtnClass) ||
      classList.contains(popupOpenedClass);

    if (closeCondition) this.close();
  };

  #handlePopupCloseEsc = (evt) => {
    if (evt.key === 'Escape') this.close();
  };

  close() {
    this.#popup.classList.remove(popupOpenedClass);
    document.removeEventListener('keyup', this.#handlePopupCloseEsc);
  }
}
