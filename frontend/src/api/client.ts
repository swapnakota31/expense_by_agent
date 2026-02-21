import axios from "axios";

const resolvedApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

if (import.meta.env.DEV) {
  console.log(`[API] Using base URL: ${resolvedApiBaseUrl}`);
}

const api = axios.create({
  baseURL: resolvedApiBaseUrl,
});

// Attach token on every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
