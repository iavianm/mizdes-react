// export const BASE_URL = "http://localhost:3000/api";
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

export const removeBooking = (bookingId) => {
  return fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse);
};

export const getBookings = () =>
  fetch(`${BASE_URL}/bookings`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse);

export const showBooking = (bookingId) =>
  fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse);

export function updateBooking(bookingId, booking) {
  console.log(booking);

  return fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cottageType: booking.cottage_type,
      name: booking.name,
      arrivalDate: booking.arrival_date,
      departureDate: booking.departure_date,
      adults: booking.adults,
      children: booking.children,
      phone: booking.phone,
      email: booking.email || "",
      additionalOptions: booking.additional_options || [],
    }),
  }).then(getResponse);
}

export function createBooking(booking) {
  return fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cottageType: booking.cottage_type,
      name: booking.name,
      arrivalDate: booking.arrival_date,
      departureDate: booking.departure_date,
      adults: booking.adults,
      children: booking.children,
      phone: booking.phone,
      email: booking.email || "",
      additionalOptions: booking.additional_options || [],
    }),
  }).then(getResponse);
}
