import { serverConfig } from "../utils/config";

const getResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject({ status: res.status, statusText: res.statusText });
};

export function getUserInfo() {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    headers: serverConfig.headers,
  }).then(getResponse);
}

export function setUserInfo({ name, about }) {
  return fetch(`${serverConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: serverConfig.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(getResponse);
}

export function setUserAvatar(avatar) {
  return fetch(`${serverConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
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
    method: "POST",
    headers: serverConfig.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(getResponse);
}

export function deleteCard(cardId) {
  return fetch(`${serverConfig.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: serverConfig.headers,
  }).then(getResponse);
}

export function toggleLike(cardId, isLiked) {
  return fetch(`${serverConfig.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? "DELETE" : "PUT",
    headers: serverConfig.headers,
  }).then(getResponse);
}
