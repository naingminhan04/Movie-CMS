import axios from "axios";

import { setupResponseInterceptor } from "./interceptor";
import { getAccessToken } from "@/lib/auth-tokens";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

setupResponseInterceptor(api);

export default api;
