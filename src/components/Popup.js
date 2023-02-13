import { popupCloseBtnClass, popupOpenedClass } from '../utils/constants.js';

export class Popup {
  #popup;

  constructor(selector) {
    this.#popup = document.querySelector(selector);
  }

  open() {
    // добавить класс + listeners
    this.#popup.classList.add(popupOpenedClass);
    this.#addCloseListeners();
  }

  #addCloseListeners() {
    this.#popup.addEventListener('mousedown', this.#handleMouseEvent);
    document.addEventListener('keydown', this.#handleKeyboardEvent);
  }

  #removeCloseListeners() {
    document.removeEventListener('mousedown', this.#handleMouseEvent);
    document.removeEventListener('keydown', this.#handleKeyboardEvent);
  }

  #handleMouseEvent = (e) => {
    const closeCondition = e.target.classList.contains(popupCloseBtnClass)
      || e.target.classList.contains(popupOpenedClass);
    if (closeCondition) this.close();
  };

  #handleKeyboardEvent = (e) => {
    if (e.key === 'Escape') this.close();
  };

  close() {
    this.#removeCloseListeners();
    this.#popup.classList.remove(popupOpenedClass);
  }
}