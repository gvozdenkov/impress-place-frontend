export class User {
  #id;
  #name;
  #about;
  #avatar;

  constructor({ _id, name, about, avatar }) {
    this.#id = _id;
    this.#name = name;
    this.#about = about;
    this.#avatar = avatar;
  }

  update({ name, about, avatar }) {
    this.#name = name;
    this.#about = about;
    this.#avatar = avatar;
  }

  id() {
    return this.#id;
  }

  getData() {
    return {
      name: this.#name,
      about: this.#about,
      avatar: this.#avatar,
    };
  }
}
