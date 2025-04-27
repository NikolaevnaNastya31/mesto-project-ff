//  Конфигурация проекта
export const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1",
  cohortId: "wff-cohort-36",
  token: "4e3904c2-4c82-47f4-bc93-e6687e6743ab",
};

// Получение заголовков для запросов
function getHeaders() {
  return {
    Authorization: config.token,
    "Content-Type": "application/json",
  };
}

// Обработка ответа от сервера
function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

//  Базовая функция для GET-запросов
export function makeRequest(endpoint) {
  const url = `${config.baseUrl}/${config.cohortId}${endpoint}`;
  return fetch(url, {
    method: "GET",
    headers: getHeaders(),
  }).then(handleResponse);
}

// Получение карточек
export const getCards = () => makeRequest("/cards");

// Получение данных пользователя
export const getProfile = () => makeRequest("/users/me");

// Обновление профиля пользователя
export const changeData = (name, about) => {
  const url = `${config.baseUrl}/${config.cohortId}/users/me`;
  return fetch(url, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ name, about }),
  }).then(handleResponse);
};

// Обновление аватара пользователя
export function editAvatar(data) {
  const url = `${config.baseUrl}/${config.cohortId}/users/me/avatar`;
  return fetch(url, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ avatar: data.avatar }),
  }).then(handleResponse);
}

// Добавление новой карточки
export const addCardToServer = (name, link) => {
  const url = `${config.baseUrl}/${config.cohortId}/cards`;
  return fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ name, link }),
  }).then(handleResponse);
};

// Удаление карточки
export function deleteCardOnServer(cardId) {
  const url = `${config.baseUrl}/${config.cohortId}/cards/${cardId}`;
  return fetch(url, {
    method: "DELETE",
    headers: getHeaders(),
  }).then(handleResponse);
}

// Постановка и снятие лайка
export function toggleLike(cardId, isLiked) {
  let method;
  if (isLiked) {
    method = "DELETE";
  } else {
    method = "PUT";
  }
  const url = `${config.baseUrl}/${config.cohortId}/cards/likes/${cardId}`;
  return fetch(url, {
    method,
    headers: getHeaders(),
  }).then(handleResponse);
}
