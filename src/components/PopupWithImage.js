import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  #image;
  #title;

  constructor(popupSelector, imageSelector, titleSelector) {
    super(popupSelector);
    this.#image = document.querySelector(imageSelector);
    this.#title = document.querySelector(titleSelector);
  }

  fill({ link, name }) {
    this.#image.src = link;
    this.#image.alt = name;
    this.#title.textContent = name;
  }
}