import axios from "axios";
import localStorageService from "../services/localStorageService";
import { notification } from "antd";

axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.interceptors.request.use(
  (config) => {
    if (config.url.includes("/login") || config.url.includes("/register"))
      return config;

    const token = localStorageService.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response?.status === 401) {
      localStorageService.removeToken();
      window.location.reload(); // refresh page
      notification.error({
        message: "Plesae Login",
      });
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default axios;
