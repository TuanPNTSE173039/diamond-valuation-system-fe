import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
