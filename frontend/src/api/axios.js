import axios from "axios";

// Axios instance a backendhez
export const httpClient = axios.create({
  baseURL: "http://localhost:5000", // root, ne /api/v1
  withCredentials: true,           // ez kell a cookie-hoz
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ❌ Interceptor törölve, nincs kézi XSRF token kezelés
