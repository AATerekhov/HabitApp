import axios from 'axios';
import UserService from "../services/UserService";

const _axios = axios.create({ baseURL: import.meta.env.VITE_API_URL });

_axios.interceptors.request.use(
  (config) => {
    if (UserService.isLoggedIn()) {
      const cb = () => {
        config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        return Promise.resolve(config);
      };
      return UserService.updateToken(cb);
      } else {
        return config;
      }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default _axios;