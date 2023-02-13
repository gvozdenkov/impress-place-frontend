export class Section {
  #array;
  #container;
  #renderer;

  constructor({ data, renderer }, containerSelector) {
    this.#array = data;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.#array.reverse().forEach((item) => {
      this.#renderer(item);
    });
  }

  setItem(element) {
    this.#container.prepend(element);
  }
}
