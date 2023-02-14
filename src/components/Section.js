export class Section {
  #items;
  #container;
  #renderer;

  constructor({ items, renderer }, containerSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  render() {
    this.#items.reverse().forEach((item) => {
      this.#renderer(item);
    });
  }

  addItem(element) {
    this.#container.prepend(element);
  }
}
