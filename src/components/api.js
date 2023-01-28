import { serverConfig } from '../utils/config';

export let API_ERROR_MESSAGE = '';

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res
      .json()
      .then((err) => (API_ERROR_MESSAGE = err.message))
      .then(() =>
        Promise.reject({
          status: res.status,
          statusText: res.statusText,
        }),
      );
  }
};

export function getAppInfo() {
  return Promise.all([getUserInfo(), getCards()]);
}

export function getUserInfo() {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    headers: serverConfig.headers,
  }).then(getResponse);
}

export function setUserInfo({ name, about }) {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: serverConfig.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(getResponse);
}

export function setUserAvatar(avatar) {
  return fetch(`${serverConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: serverConfig.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(getResponse);
}

export function getCards() {
  return fetch(`${serverConfig.baseUrl}/cards`, {
    headers: serverConfig.headers,
  }).then(getResponse);
}

export function addCard({ name, link }) {
  return fetch(`${serverConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(getResponse);
}

export function deleteCard(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: serverConfig.headers,
  }).then(getResponse);
}

export function setLike(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: serverConfig.headers,
  }).then(getResponse);
}

export function deleteLike(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: serverConfig.headers,
  }).then(getResponse);
}
