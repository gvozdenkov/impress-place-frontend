import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  #form;
  #handleSubmit;
  #saveSessionData;

  constructor({ popupSelector }) {
    super(popupSelector);
    this.#form = super.getPopupElement().querySelector('.form');
    this.#setEventListeners();
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
    // this.#form.addEventListener('submit', this.#handleSubmit);
  }

  open(saveSessionData = () => {
  }) {
    super.open();
    this.#saveSessionData = saveSessionData;
  }

  reset() {
    this.updateHandleSubmit(() => {});
    setTimeout(() => this.#form.reset(), 300);
  }

  close() {
    super.close();
    this.#saveSessionData();
  }
}
