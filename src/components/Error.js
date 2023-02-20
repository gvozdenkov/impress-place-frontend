export class Error {
  #code;
  #body;
  #templateElement;
  #listElement;
  #wrapperElement;

  constructor({ code, body }) {
    this.#templateElement = document.querySelector('#error').content.querySelector('.error__item');
    this.#listElement = document.querySelector('.error__list');
    this.#wrapperElement = document.querySelector('.error');
    this.#code = code;
    this.#body = body;
  }

  #addErrorActiveClass(errorElement) {
    errorElement.classList.add('error__item_active');
    this.#wrapperElement.classList.add('error_active');
  }

  #removeErrorActiveClass(errorElement) {
    errorElement.classList.remove('error__item_active');
    this.#wrapperElement.classList.remove('error_active');
  };

  #closeButtonListener = (element) => {
    this.#removeErrorActiveClass(element);
    setTimeout(() => element.remove(), 500);
  };

  createError() {
    const errorItem = this.#templateElement.cloneNode(true);
    console.log(errorItem);
    const errorItemTitle = errorItem.querySelector('.error__title');
    const errorItemBody = errorItem.querySelector('.error__description');
    const errorItemButton = errorItem.querySelector('.error__close');
    this.#addErrorActiveClass(errorItem);
    errorItemButton.addEventListener('click', () => this.#closeButtonListener(errorItem));
    errorItemTitle.textContent = `Код ${this.code}`;
    errorItemBody.textContent = this.#body;
    // todo: вынести в section?
    this.#listElement.prepend(errorItem);
    return errorItem;
  }
}