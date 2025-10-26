import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888/",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const id = localStorage.getItem("userId");
    if (id && id !== "undefined") {
      config.headers["x-user-id"] = id;
    }
  }
  return config;
});
