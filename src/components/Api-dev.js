import { serverConfig } from '../utils/config';

class Api {
  #baseUrl;
  #headers;

  constructor(config) {
    this.#baseUrl = config.baseUrl;
    this.#headers = config.headers;
  }

  #getResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка! ${res.statusText} Код ошибки: ${res.status}.`);
  }

  async #request(endpoint, options = {}) {
    const url = `${this.#baseUrl}/${endpoint}`;
    const res = await fetch(url, {
      headers: this.#headers,
      ...options,
    });

    return this.#getResponse(res);
  }

  getUser() {
    this.#request(`users/me`);
  }

  updateUser({ name, about }) {
    this.#request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  updateUserAvatar(avatar) {
    this.#request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    });
  }

  getCards() {
    this.#request(`cards`, {});
  }

  addCard({ name, link }) {
    this.#request('cards', {
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  deleteCard(cardId) {
    this.#request(`cards/${cardId}`, {
      method: 'DELETE',
    });
  }

  toggleLike(cardId, isLiked) {
    this.#request(`cards/likes/${cardId}`, {
      method: isLiked ? 'DELETE' : 'PUT',
    });
  }
}

const api = new Api(serverConfig);

export { api };
