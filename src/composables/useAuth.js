import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { getDashboardRouteForRole } from '@/constants/routes';
import { normalizeRole } from '@/constants/roles';

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const user = computed(() => authStore.user);
  const role = computed(() => authStore.role);

  const login = async (credentials) => {
    try {
      const response = await authStore.login(credentials);
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error: error.message || error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = async () => {
    await authStore.logout();
    router.push('/userLogin');
  };

  const hasRole = (requiredRole) => authStore.hasRole(requiredRole);
  const hasAnyRole = (roles) => authStore.hasAnyRole(roles);

  const redirectByRole = (userRole = authStore.role) => {
    const route = getDashboardRouteForRole(normalizeRole(userRole));
    router.push(route);
    return route;
  };

  return {
    isAuthenticated,
    user,
    role,
    login,
    logout,
    hasRole,
    hasAnyRole,
    redirectByRole,
    isArtist: computed(() => authStore.isArtist),
    isCustomer: computed(() => authStore.isCustomer),
    isManager: computed(() => authStore.isManager),
    isAdmin: computed(() => authStore.isAdmin),
    isOrganization: computed(() => authStore.isOrganization)
  };
}
