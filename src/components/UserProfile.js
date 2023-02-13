export class UserProfile {
  #profileName;
  #profileAbout;
  #profileAvatar;

  constructor({
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
  }) {
    this.#profileName = document.querySelector(profileNameSelector);
    this.#profileAbout = document.querySelector(profileAboutSelector);
    this.#profileAvatar = document.querySelector(profileAvatarSelector);
  }

  render({ name, about, avatar }) {
    this.#profileName.textContent = name;
    this.#profileAbout.textContent = about;
    this.#profileAvatar.src = avatar;
  }
}
