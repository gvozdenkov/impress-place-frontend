import { formSelector } from '../utils/constants';
import { Popup } from './Popup';

export class PopupWithFormConfirm extends Popup {
  #handleSubmit;
  #form;

  setSubmitHandler(handleSubmit) {
    this.#handleSubmit = handleSubmit;
  }

  addEventListeners() {
    super.addEventListeners();

    this.#form = super.getPopupElement().querySelector(formSelector);
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmit();
    });
  }
}
