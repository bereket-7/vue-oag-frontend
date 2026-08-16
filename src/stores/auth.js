import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/authService';
import { normalizeRole, ROLES } from '@/constants/roles';
import { normalizeUser } from '@/utils/normalizers';
import { parseStoredJson, isTokenExpired, roleFromToken, isMockToken } from '@/utils/security';
import { isMockMode } from '@/services/adapters';
import { connectNotifications, disconnectNotifications } from '@/services/socket';
import { useUserStore } from '@/stores/user';

function readStoredToken() {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!token) return null;
  if (isMockToken(token) && !isMockMode()) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    return null;
  }
  if (isTokenExpired(token) && !refreshToken) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    return null;
  }
  return token;
}

function applySession(authToken, userData, userRole, refreshToken) {
  const tokenRole = roleFromToken(authToken);
  const normalizedRole = tokenRole || normalizeRole(userRole);
  const normalizedUser = normalizeUser({ ...userData, role: normalizedRole });
  localStorage.setItem('token', authToken);
  localStorage.setItem('user', JSON.stringify(normalizedUser));
  if (normalizedRole) localStorage.setItem('role', normalizedRole);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  return { normalizedRole, normalizedUser };
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(readStoredToken());
  const refreshToken = ref(localStorage.getItem('refreshToken'));
  const user = ref(token.value ? parseStoredJson(localStorage.getItem('user'), null) : null);
  const role = ref(token.value ? (roleFromToken(token.value) || normalizeRole(localStorage.getItem('role'))) : null);

  const isAuthenticated = computed(() => {
    if (!token.value) return false;
    if (!isTokenExpired(token.value)) return true;
    return !!refreshToken.value;
  });
  const isArtist = computed(() => role.value === ROLES.ARTIST);
  const isCustomer = computed(() => role.value === ROLES.CUSTOMER);
  const isManager = computed(() => role.value === ROLES.MANAGER);
  const isAdmin = computed(() => role.value === ROLES.ADMIN);
  const isOrganization = computed(() => role.value === ROLES.ORGANIZATION);

  const setAuth = (authToken, userData, userRole, nextRefreshToken) => {
    if (!authToken || (isTokenExpired(authToken) && !nextRefreshToken)) {
      clearAuth();
      throw new Error('Invalid or expired session');
    }
    if (isMockToken(authToken) && !isMockMode()) {
      clearAuth();
      throw new Error('Mock authentication is disabled');
    }

    const { normalizedRole, normalizedUser } = applySession(
      authToken,
      userData,
      userRole,
      nextRefreshToken ?? refreshToken.value
    );

    token.value = authToken;
    user.value = normalizedUser;
    role.value = normalizedRole;
    if (nextRefreshToken) refreshToken.value = nextRefreshToken;
    startRealtime();
  };

  const clearAuth = () => {
    disconnectNotifications();
    token.value = null;
    refreshToken.value = null;
    user.value = null;
    role.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  };

  const applyUserInfo = (response) => {
    const authToken = response.accessToken || response.token;
    const userData = response.user || {
      id: response.uuid,
      username: response.username,
      fullName: response.fullName,
      avatarUrl: response.avatarUrl,
      permissions: response.permissions,
      role: response.role
    };
    const userRole = response.user?.role || response.role || roleFromToken(authToken);
    setAuth(authToken, userData, userRole, response.refreshToken);
    return response;
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response?.requiresOtp) return response;
    return applyUserInfo(response);
  };

  const verifyLogin = async (data) => {
    const response = await authService.verifyLogin(data);
    if (response?.requiresOtp) return response;
    return applyUserInfo(response);
  };

  const register = async (userData) => authService.register(userData);

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
    }
  };

  const updateUser = (userData) => {
    user.value = { ...user.value, ...normalizeUser({ ...user.value, ...userData, role: role.value }) };
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const hasRole = (requiredRole) => role.value === normalizeRole(requiredRole);
  const hasAnyRole = (roles) => roles.some((r) => hasRole(r));

  const startRealtime = () => {
    if (!isAuthenticated.value || isMockMode()) return;
    connectNotifications((payload) => {
      try {
        const userStore = useUserStore();
        userStore.prependNotification(payload);
      } catch {
        /* store may not be ready */
      }
    });
  };

  if (isAuthenticated.value) startRealtime();

  return {
    token,
    refreshToken,
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
    verifyLogin,
    register,
    logout,
    updateUser,
    hasRole,
    hasAnyRole
  };
});
