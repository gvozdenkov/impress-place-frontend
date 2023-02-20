import { Popup } from './Popup';
import { getFormInputs } from '../utils/utils.js';

export class PopupWithForm extends Popup {
  #form;
  #handleSubmit;

  constructor({ popupSelector }) {
    super(popupSelector);
    this.#form = super.getPopupElement().querySelector('.form');
    this.#handleSubmit = () => {};
  }

  updateHandleSubmit(handler) {
    this.#handleSubmit = handler;
  }

  fillInputs(userData) {
    const keys = Object.keys(userData);
    keys.forEach(
      (input) => (this.#form.elements[input].value = userData[input]),
    );
  }

  getFormElement() {
    return this.#form;
  }

  #setEventListeners() {
    super.setEventListeners();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmit();
    });
  }

  open() {
    super.open();
    this.#setEventListeners();
  }

  close() {
    super.close();
    this.#form.reset();
    this.#handleSubmit = () => {};
  }
}
