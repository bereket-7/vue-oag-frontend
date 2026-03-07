import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const user = computed(() => authStore.user);
  const role = computed(() => authStore.role);

  const login = async (credentials) => {
    try {
      await authStore.login(credentials);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    authStore.logout();
    router.push('/userLogin');
  };

  const hasRole = (requiredRole) => {
    return authStore.role === requiredRole;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(authStore.role);
  };

  return {
    isAuthenticated,
    user,
    role,
    login,
    logout,
    hasRole,
    hasAnyRole,
    isArtist: computed(() => authStore.isArtist),
    isCustomer: computed(() => authStore.isCustomer),
    isManager: computed(() => authStore.isManager),
    isAdmin: computed(() => authStore.isAdmin),
    isOrganization: computed(() => authStore.isOrganization)
  };
}
