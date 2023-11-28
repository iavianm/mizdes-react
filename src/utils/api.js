// export const BASE_URL = "http://localhost:3000";
export const BASE_URL = "https://www.mizdes.com/api";

function getResponse(res) {
  if (!res.ok) {
    return res.json().then((data) => {
      return Promise.reject({
        status: `Ошибка: ${res.status}`,
        message: data.message,
      });
    });
  }
  return res.json();
}

export const login = ({ email, password }) =>
  fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponse);

export const logout = () =>
  fetch(`${BASE_URL}/signout`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse);

export const loginWithCookie = () =>
  fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse);
