import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const role = ref(localStorage.getItem('role') || null);

  const isAuthenticated = computed(() => !!token.value);
  const isArtist = computed(() => role.value === 'artist');
  const isCustomer = computed(() => role.value === 'customer');
  const isManager = computed(() => role.value === 'manager');
  const isAdmin = computed(() => role.value === 'admin');
  const isOrganization = computed(() => role.value === 'organization');

  const setAuth = (authToken, userData, userRole) => {
    token.value = authToken;
    user.value = userData;
    role.value = userRole;
    
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', userRole);
  };

  const clearAuth = () => {
    token.value = null;
    user.value = null;
    role.value = null;
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    const { token: authToken, user: userData, role: userRole } = response.data;
    setAuth(authToken, userData, userRole);
    return response.data;
  };

  const logout = () => {
    clearAuth();
  };

  const updateUser = (userData) => {
    user.value = { ...user.value, ...userData };
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  return {
    token,
    user,
    role,
    isAuthenticated,
    isArtist,
    isCustomer,
    isManager,
    isAdmin,
    isOrganization,
    setAuth,
    clearAuth,
    login,
    logout,
    updateUser
  };
});
