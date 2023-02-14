import { formSelector } from '../utils/constants';
import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  #form;
  #handleSubmit;

  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this.#form = super.getPopupElement().querySelector(formSelector);
    this.#handleSubmit = handleSubmit;
  }

  addEventListeners() {
    super.addEventListeners();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmit();
    });
  }

  close() {
    super.close();
    this.#form.reset();
  }
}
