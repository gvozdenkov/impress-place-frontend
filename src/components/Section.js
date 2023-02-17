export class Section {
  #container;
  #renderer;

  constructor({ renderer }, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  render(items) {
    items.reverse().forEach((item) => {
      this.#renderer(item);
    });
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}
