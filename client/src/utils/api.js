import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://127.0.0.1:4010/api",
});

// Her istekten önce token’ı otomatik ekle
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Güncel token her zaman buradan alınır
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
