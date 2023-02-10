export default class User {
  #id;
  #name;
  #about;
  #avatar;


  constructor({ id, name, about, avatar }) {
    this.#id = id;
    this.#name = name;
    this.#about = about;
    this.#avatar = avatar;
  }

  getUserId() {
    return this.#id;
  }

  getUserInfo() {
    return {
      name: this.#name,
      about: this.#about,
      avatar: this.#avatar
    }
  };
}