import { popupCloseBtnClass, popupOpenedClass } from '../utils/constants.js';

export class Popup {
  #popup;

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  open() {
    this.#popup.classList.add(popupOpenedClass);
    this.addEventListeners();
  }

  getPopupElement() {
    return this.#popup;
  }

  addEventListeners() {
    this.#popup.addEventListener('mousedown', (evt) => {
      this.#handlePopupCloseClick(evt);
    });
    document.addEventListener('keydown', (evt) => {
      this.#handlePopupCloseEsc(evt);
    });
  }

  #removeCloseListeners() {
    this.#popup.removeEventListener('mousedown', this.#handlePopupCloseClick);
    document.removeEventListener('keydown', this.#handlePopupCloseEsc);
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
    this.#removeCloseListeners();
    this.#popup.classList.remove(popupOpenedClass);
  }
}
