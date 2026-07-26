import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const token = localStorage.getItem("access");

    if (error.response?.status === 401 && token) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export default api;