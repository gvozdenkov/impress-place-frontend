export class Profile {
  #nameEl;
  #aboutEl;
  #avatarEl;
  #userId;

  #getUser;

  constructor({ nameSelector, aboutSelector, avatarSelector }, { getUser }) {
    this.#nameEl = document.querySelector(nameSelector);
    this.#aboutEl = document.querySelector(aboutSelector);
    this.#avatarEl = document.querySelector(avatarSelector);
    this.#getUser = getUser;
  }

  setUserInfo(userData) {
    const { name, about, avatar, _id } = userData;
    if (name) this.#nameEl.textContent = name;
    if (about) this.#aboutEl.textContent = about;
    if (avatar) this.#avatarEl.src = avatar;
    if (_id) this.#userId = _id;
  }

  async getUserInfo() {
    const user = await this.#getUser();
    return {
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    };
  }

  setEventListeners(config) {
    config.forEach((element) => {
      document
        .querySelector(element.selector)
        .addEventListener('click', element.handleClick);
    });
  }
}
