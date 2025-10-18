import axios from "axios";
import CookieService from "@/services/CookieServices/CookieServices"; // Adjust the import path as needed

// Create an Axios instance with the updated base URL
const api = axios.create({
  baseURL: "https://upskilling-egypt.com:3005/api",
});

// --- Request Interceptor ---
// Runs before every request to attach the token from cookies if it exists.
api.interceptors.request.use(
  (config) => {
    const token = CookieService.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
