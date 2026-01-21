import axios from "axios";

// Axios instance a backendhez
export const httpClient = axios.create({
  baseURL: "http://localhost:5001", // root, ne /api/v1
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { "X-API-TOKEN": token } : {};
};

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["X-API-TOKEN"] = token;
  }
  return config;
});
