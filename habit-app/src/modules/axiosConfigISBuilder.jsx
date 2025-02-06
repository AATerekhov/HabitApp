// api.js v1.0

import axios from 'axios';
import userManager  from "../services/authConfig";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const user = await userManager.getUser();
  if (user && !user.expired) {
    config.headers.Authorization = `Bearer ${user.access_token}`;
  } else {
    await userManager.signinRedirect();
  }
  return config;
});

export default api;