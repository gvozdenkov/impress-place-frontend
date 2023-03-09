export class ErrorPopup {
  #code;
  #message;
  #templateSelector;
  #wrapperElement;

  constructor({ code, message }, templateSelector) {
    this.#templateSelector = templateSelector;
    this.#wrapperElement = document.querySelector('.error-list');
    this.#code = code;
    this.#message = message;
  }

  #getElement() {
    return document
      .querySelector(this.#templateSelector)
      .content.children[0].cloneNode(true);
  }

  #addErrorActiveClass(errorElement) {
    errorElement.classList.add('error-list__item_active');
    this.#wrapperElement.classList.add('error-list_active');
  }

  #removeErrorActiveClass(errorElement) {
    errorElement.classList.remove('error-list__item_active');
    this.#wrapperElement.classList.remove('error-list_active');
  }

  #closeButtonListener = (element) => {
    this.#removeErrorActiveClass(element);
    setTimeout(() => element.remove(), 300);
  };

  createError() {
    const errorItem = this.#getElement();
    const errorItemTitle = errorItem.querySelector('.error-popup__title');
    const errorItemBody = errorItem.querySelector('.error-popup__description');
    const errorItemButton = errorItem.querySelector('.error-popup__close');
    this.#addErrorActiveClass(errorItem);
    errorItemButton.addEventListener('click', () =>
      this.#closeButtonListener(errorItem),
    );
    errorItemTitle.textContent = `Код ${this.#code}`;
    errorItemBody.textContent = this.#message;
    return errorItem;
  }
}
