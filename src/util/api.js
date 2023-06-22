import axios from 'axios';
import { removeAuthToken } from '@/util/auth';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://localhost:8082/api', 
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeAuthToken();
      router.push('/userLogin');
    }
    return Promise.reject(error);
  }
);

export default api;
