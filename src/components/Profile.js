export class Profile {
  #userData;
  #renderer;

  constructor({ userData, renderer }) {
    this.#userData = userData;
    this.#renderer = renderer;
  }

  update(userData) {
    this.#userData = userData;
  }

  render() {
    this.#renderer(this.#userData);
  }
}
