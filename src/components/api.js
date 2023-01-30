import { serverConfig } from '../utils/config';

const getResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json();
    return Promise.reject({
      status: res.status,
      text: res.statusText,
      message: err.message,
    });
  }

  return await res.json();
};

export async function getAppInfo() {
  return Promise.all([getUserInfo(), getCards()]);
}

export async function getUserInfo() {
  const res = await fetch(`${serverConfig.baseUrl}/users/me`, {
    headers: serverConfig.headers,
  });

  return getResponse(res);
}

export async function setUserInfo({ name, about }) {
  const res = await fetch(`${serverConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: serverConfig.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });

  return getResponse(res);
}

export async function setUserAvatar(avatar) {
  const res = await fetch(`${serverConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: serverConfig.headers,
    body: JSON.stringify({
      avatar,
    }),
  });

  return getResponse(res);
}

export async function getCards() {
  const res = await fetch(`${serverConfig.baseUrl}/cards`, {
    headers: serverConfig.headers,
  });

  return getResponse(res);
}

export async function addCard({ name, link }) {
  const res = await fetch(`${serverConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });

  return getResponse(res);
}

export async function deleteCard(cardId) {
  const res = await fetch(`${serverConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: serverConfig.headers,
  });

  return getResponse(res);
}

export async function toggleLike(cardId, isLiked) {
  const res = await fetch(`${serverConfig.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: serverConfig.headers,
  });

  return getResponse(res);
}
