<template>
  <div class="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed top-16 lg:top-20 left-0 z-40 w-64 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]',
          'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
          'transform transition-transform duration-300 ease-in-out flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <div class="p-5 border-b border-gray-100 dark:border-gray-800">
          <p class="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
            KELEM
          </p>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white truncate">
            {{ sidebarTitle }}
          </h2>
        </div>

        <nav class="flex-1 p-3 overflow-y-auto space-y-4">
          <div
            v-for="group in navGroups"
            :key="group.section"
          >
            <p class="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              {{ group.section }}
            </p>
            <div class="space-y-0.5">
              <router-link
                v-for="item in group.items"
                :key="item.key"
                :to="item.to"
                class="nav-item"
                :class="{ 'nav-item--active': isActive(item) }"
                @click="sidebarOpen = false"
              >
                <i
                  v-if="item.icon"
                  :class="item.icon"
                  class="w-4 text-center shrink-0"
                />
                <span class="truncate">{{ item.label }}</span>
              </router-link>
            </div>
          </div>
        </nav>

        <div class="p-3 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            @click="showLogoutDialog = true"
          >
            <i class="fas fa-sign-out-alt w-4 text-center" />
            Logout
          </button>
        </div>
      </aside>

      <div
        v-if="sidebarOpen"
        class="fixed inset-0 top-16 bg-gray-900/50 backdrop-blur-sm z-30 lg:hidden"
        @click="sidebarOpen = false"
      />

      <div class="flex-1 lg:ml-64 min-w-0 w-full">
        <div class="lg:hidden sticky top-16 z-20 flex items-center gap-3 px-4 py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            aria-label="Toggle sidebar"
            @click="sidebarOpen = !sidebarOpen"
          >
            <i class="fas fa-bars" />
          </button>
          <span class="font-semibold text-gray-900 dark:text-white truncate">{{ currentLabel }}</span>
        </div>

        <div class="min-w-0">
          <slot />
        </div>
      </div>
    </div>

    <BaseModal
      v-model="showLogoutDialog"
      title="Confirm Logout"
      size="sm"
    >
      <p class="text-gray-700 dark:text-gray-300">
        Are you sure you want to logout?
      </p>
      <template #footer>
        <BaseButton
          variant="secondary"
          @click="showLogoutDialog = false"
        >
          Cancel
        </BaseButton>
        <BaseButton
          variant="danger"
          @click="handleLogout"
        >
          Logout
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAuth } from '@/composables/useAuth';
import { getSidebarNav, getSidebarTitle } from '@/constants/sidebarNav';
import { BaseModal, BaseButton } from '@/components/common';

const route = useRoute();
const authStore = useAuthStore();
const { logout } = useAuth();

const sidebarOpen = ref(false);
const showLogoutDialog = ref(false);

const navGroups = computed(() => getSidebarNav(authStore.role));
const sidebarTitle = computed(() => getSidebarTitle(authStore.role));

const allItems = computed(() => navGroups.value.flatMap((g) => g.items));

const currentLabel = computed(() => {
  const active = allItems.value.find((item) => isActive(item));
  return active?.label || 'Menu';
});

function isActive(item) {
  const to = item.to;
  if (typeof to === 'string') {
    if (to === '/') return route.path === '/';
    return route.path === to || route.path.startsWith(to + '/');
  }
  if (to.path) {
    const pathMatch = route.path === to.path || (to.path !== '/' && route.path.startsWith(to.path));
    if (!pathMatch) return false;
    if (to.query?.tab) return route.query.tab === to.query.tab;
    return !route.query.tab || to.path !== getDashboardPath();
  }
  return false;
}

function getDashboardPath() {
  const role = authStore.role?.toUpperCase();
  const paths = {
    ARTIST: '/artistDashboard',
    CUSTOMER: '/customerDashboard',
    MANAGER: '/managerDashboard',
    ADMIN: '/adminDashboard',
    ORGANIZATION: '/organizationDashboard'
  };
  return paths[role] || '';
}

const handleLogout = () => {
  logout();
  showLogoutDialog.value = false;
};
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200;
  @apply text-gray-600 dark:text-gray-400;
  @apply hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300;
}
.nav-item--active {
  @apply bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25;
  @apply hover:text-white hover:from-purple-600 hover:to-indigo-600;
}
</style>
