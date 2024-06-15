import axios from "axios";
import AuthService from "../auth.service.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
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
