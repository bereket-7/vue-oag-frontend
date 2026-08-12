import axios from 'axios';
import router from '@/router';
import { isTokenExpired } from '@/utils/security';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:8082/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (isTokenExpired(token)) {
        clearSession();
        router.push('/userLogin');
        return Promise.reject(new Error('Session expired'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession();
      if (router.currentRoute.value.path !== '/userLogin') {
        router.push('/userLogin');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
