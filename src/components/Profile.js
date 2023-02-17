export class Profile {
  #nameEl;
  #aboutEl;
  #avatarEl;
  #userId;

  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this.#nameEl = document.querySelector(nameSelector);
    this.#aboutEl = document.querySelector(aboutSelector);
    this.#avatarEl = document.querySelector(avatarSelector);
  }

  setUserInfo(userData) {
    const { name, about, avatar, _id } = userData;
    if (name) this.#nameEl.textContent = name;
    if (about) this.#aboutEl.textContent = about;
    if (avatar) this.#avatarEl.src = avatar;
    if (_id) this.#userId = _id;
  }

  getUserInfo() {
    return {
      name: this.#nameEl.textContent,
      about: this.#aboutEl.textContent,
      avatar: this.#avatarEl.src,
      _id: this.#userId,
    };
  }

  addEventListeners(config) {
    config.forEach((element) => {
      document
        .querySelector(element.selector)
        .addEventListener('click', element.handleClick);
    });
  }
}
