import axios from 'axios';
import router from '@/router';
import { isTokenExpired } from '@/utils/security';
import { envelopeMessage, unwrapEnvelope } from '@/utils/unwrap';

const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8088/api/v1';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('role');
}

let refreshPromise = null;

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;
  const { data } = await axios.post(`${baseURL}/auth/token/refresh`, { refreshToken });
  const content = unwrapEnvelope(data);
  const token = content?.token;
  if (!token) return null;
  localStorage.setItem('token', token);
  if (content.refreshToken) localStorage.setItem('refreshToken', content.refreshToken);
  return token;
}

function shouldSkipAuth(config) {
  const url = config?.url || '';
  return url.includes('/auth/login')
    || url.includes('/auth/register')
    || url.includes('/auth/token/refresh')
    || url.includes('/auth/password/');
}

api.interceptors.request.use(
  async (config) => {
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    if (shouldSkipAuth(config)) return config;

    let token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      try {
        refreshPromise = refreshPromise || refreshAccessToken();
        token = await refreshPromise;
      } catch {
        token = null;
      } finally {
        refreshPromise = null;
      }
      if (!token) {
        clearSession();
        if (router.currentRoute.value.path !== '/userLogin') {
          router.push('/userLogin');
        }
        return Promise.reject(new Error('Session expired'));
      }
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const original = error.config || {};
    if (status === 401 && !original._retry && !shouldSkipAuth(original)) {
      original._retry = true;
      try {
        refreshPromise = refreshPromise || refreshAccessToken();
        const token = await refreshPromise;
        refreshPromise = null;
        if (token) {
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        }
      } catch {
        refreshPromise = null;
      }
      clearSession();
      if (router.currentRoute.value.path !== '/userLogin') {
        router.push('/userLogin');
      }
    }
    const message = envelopeMessage(error);
    const wrapped = new Error(message);
    wrapped.status = status;
    wrapped.response = error.response;
    return Promise.reject(wrapped);
  }
);

export default api;
