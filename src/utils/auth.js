import { reactive } from 'vue';

const auth = reactive({
  token: null,
  isAuthenticated: false,
});

export function setAuthToken(token) {
  auth.token = token;
  auth.isAuthenticated = !!token;
  localStorage.setItem('token', token);
}

export function removeAuthToken() {
  auth.token = null;
  auth.isAuthenticated = false;
  localStorage.removeItem('token');
}

export function initializeAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
}

export const isAuthenticated = () => auth.isAuthenticated;

export default auth;
