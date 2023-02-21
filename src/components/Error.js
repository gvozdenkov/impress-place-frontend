export class Error {
  #code;
  #body;
  #templateSelector;
  #listElement;
  #wrapperElement;

  constructor({ code, body }, templateSelector) {
    this.#templateSelector = templateSelector;
    this.#listElement = document.querySelector('.error-popup__list');
    this.#wrapperElement = document.querySelector('.error');
    this.#code = code;
    this.#body = body;
  }

  #getElement() {
    return document
      .querySelector(this.#templateSelector)
      .content.children[0].cloneNode(true);
  }

  #addErrorActiveClass(errorElement) {
    errorElement.classList.add('error-popup__item_active');
    this.#wrapperElement.classList.add('error_active');
  }

  #removeErrorActiveClass(errorElement) {
    errorElement.classList.remove('error-popup__item_active');
    this.#wrapperElement.classList.remove('error-popup_active');
  }

  #closeButtonListener = (element) => {
    this.#removeErrorActiveClass(element);
    setTimeout(() => element.remove(), 500);
  };

  createError() {
    const errorItem = this.#getElement();
    console.log(errorItem);
    const errorItemTitle = errorItem.querySelector('.error-popup__title');
    const errorItemBody = errorItem.querySelector('.error-popup__description');
    const errorItemButton = errorItem.querySelector('.error-popup__close');
    this.#addErrorActiveClass(errorItem);
    errorItemButton.addEventListener('click', () =>
      this.#closeButtonListener(errorItem),
    );
    errorItemTitle.textContent = `Код ${this.code}`;
    errorItemBody.textContent = this.#body;
    // todo: вынести в section?
    this.#listElement.prepend(errorItem);
    return errorItem;
  }
}
