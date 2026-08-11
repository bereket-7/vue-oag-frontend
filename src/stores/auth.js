import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/authService';
import { normalizeRole, ROLES } from '@/constants/roles';
import { normalizeUser } from '@/utils/normalizers';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null);
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const role = ref(normalizeRole(localStorage.getItem('role')) || null);

  const isAuthenticated = computed(() => !!token.value);
  const isArtist = computed(() => role.value === ROLES.ARTIST);
  const isCustomer = computed(() => role.value === ROLES.CUSTOMER);
  const isManager = computed(() => role.value === ROLES.MANAGER);
  const isAdmin = computed(() => role.value === ROLES.ADMIN);
  const isOrganization = computed(() => role.value === ROLES.ORGANIZATION);

  const setAuth = (authToken, userData, userRole) => {
    const normalizedRole = normalizeRole(userRole);
    const normalizedUser = normalizeUser(userData);
    token.value = authToken;
    user.value = normalizedUser;
    role.value = normalizedRole;
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    localStorage.setItem('role', normalizedRole);
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
    const response = await authService.login(credentials);
    const authToken = response.accessToken || response.token;
    const userData = response.user || { id: 0, username: credentials.username, role: response.role };
    const userRole = response.role;
    setAuth(authToken, userData, userRole);
    return response;
  };

  const register = async (userData) => {
    return authService.register(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
    }
  };

  const updateUser = (userData) => {
    user.value = { ...user.value, ...normalizeUser({ ...user.value, ...userData }) };
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const hasRole = (requiredRole) => role.value === normalizeRole(requiredRole);
  const hasAnyRole = (roles) => roles.some((r) => hasRole(r));

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
    register,
    logout,
    updateUser,
    hasRole,
    hasAnyRole
  };
});
