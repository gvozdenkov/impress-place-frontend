import {
  ellipsisClass,
  ellipsisContainerSelector,
  formSelector, submitButtonTextSelector
} from '../utils/constants';
import { Popup } from './Popup';
import { handleError } from '../utils/utils.js';

export class PopupWithForm extends Popup {
  #form;
  #handleSubmit;
  #submitButton;
  #submitButtonText;
  #ellipsis;
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this.#form = super.getPopupElement().querySelector(formSelector);
    this.#handleSubmit = handleSubmit;
    this.#submitButton = this.#form.querySelector('.button');
    console.log(this.#submitButton);
    this.#submitButtonText = this.#form.querySelector(submitButtonTextSelector);
    console.log(this.#submitButtonText);
    this.#ellipsis = this.#submitButton.querySelector(ellipsisContainerSelector);
    console.log(this.#ellipsis);
  }

  fillInputs(args) {
    this.#form.querySelectorAll('.form__input').forEach((input, index) => input.value = args[index]);
  }

  getFormElement() {
    return this.#form;
  }

  addEventListeners() {
    super.addEventListeners();
    this.#form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.showButtonLoadingEllipsis('Сохранение');
      this.#handleSubmit();
      this.hideButtonLoadingEllipsis('Сохранить');
    });
  }

  close() {
    super.close();
    this.#form.reset();
  }

  showButtonLoadingEllipsis(text) {
    this.#submitButtonText.textContent = text;
    this.#ellipsis.classList.add(ellipsisClass);
  }
  hideButtonLoadingEllipsis(text) {
    this.#submitButtonText.textContent = text;
    this.#ellipsis.classList.remove(ellipsisClass);
  }
}
