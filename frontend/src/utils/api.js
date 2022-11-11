import {BASE_URL} from './constants.js';

class Api {
  constructor({ baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._getJsonOnError = this._getJsonOnError.bind(this);
  }

  _getJsonOnError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getJsonOnError).then(res => res.data);
  };

  createUserInfo = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._getJsonOnError).then(res => res.data);;
  };

  createUserAvatar = (avatar) => {
    return fetch(`${this._baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._getJsonOnError).then(res => res.data);;
  };

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getJsonOnError).then(res => res.data);
  };

  createUserCard = (name, link) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._getJsonOnError).then(res => res.data);;
  };

  deleteUserCard = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOnError).then(res => res.data);;
  };

  changeLikeCardStatus = (id, isliked) => {
    return isliked ? this.createLike(id) : this.deleteLike(id);
  };

  createLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ id }),
    }).then(this._getJsonOnError).then(res => res.data);;
  };

  deleteLike = (id) => {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getJsonOnError).then(res => res.data);;
  };

  updateToken = (jwt) => {
    this._headers['Authorization'] = `Bearer ${jwt}`;
  };
};

const jwt = localStorage.getItem("jwt");
const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
    'Authorization': `Bearer ${jwt}`,
  },
});

export default api;
