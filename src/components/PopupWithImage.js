import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  #image;
  #title;

  constructor({ popupSelector, imageSelector, titleSelector }) {
    super(popupSelector);
    this.#image = document.querySelector(imageSelector);
    this.#title = document.querySelector(titleSelector);
  }

  open({ link, name }) {
    this.#image.src = link;
    this.#image.alt = `${name}.`;
    this.#title.textContent = name;
    super.open();
  }
}
