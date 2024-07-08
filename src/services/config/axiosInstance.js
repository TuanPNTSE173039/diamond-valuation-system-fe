import axios from "axios";
import AuthService from "../auth.service.js";

// export const frontendUrl = "http://localhost:5173/";
export const frontendUrl = "https://console.hntdiamond.store";
// export const basedUrl = "http://localhost:8080/api/v1/";
export const basedUrl = "https://diamond-valuation-system.onrender.com/api/v1/";
const axiosInstance = axios.create({
  baseURL: basedUrl,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AuthService.getCurrentToken();
    const user = AuthService.getCurrentUser();
    const accessToken = token?.accessToken;
    if (user && token && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axiosInstance };
