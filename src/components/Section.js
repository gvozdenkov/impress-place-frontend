export class Section {
  #container;
  #renderer;

  constructor({ renderer }, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  render(items) {
    this.#renderer(items);
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}
