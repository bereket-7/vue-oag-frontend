<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div v-if="activeTab.key === 'overview'">
      <PageHeader
        title="Welcome back"
        :subtitle="`Hello, ${userName}!`"
        eyebrow="Customer"
      />

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="page-card p-5"
        >
          <i
            :class="stat.icon"
            class="text-2xl text-purple-600 dark:text-purple-400 mb-3"
          />
          <p class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ stat.value }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ stat.label }}
          </p>
        </div>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <router-link
          v-for="action in quickActions"
          :key="action.key"
          :to="action.to"
          class="page-card p-5 text-left hover:border-purple-300 dark:hover:border-purple-700 transition-all group block"
        >
          <i
            :class="action.icon"
            class="text-2xl text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-3 transition-colors"
          />
          <p class="font-medium text-gray-900 dark:text-white text-sm">
            {{ action.label }}
          </p>
        </router-link>
      </div>
    </div>

    <ProfileSetting
      v-else-if="activeTab.key === 'profile'"
      embedded
    />
    <ChangePassword
      v-else-if="activeTab.key === 'password'"
      embedded
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import ProfileSetting from '@/views/User/ProfileSetting.MODERN.vue';
import ChangePassword from '@/components/ChangePassword.MODERN.vue';
import { PageHeader } from '@/components/common';
import { useAuth } from '@/composables/useAuth';
import { useDashboardRoute } from '@/composables/useDashboardRoute';

const { user } = useAuth();

const tabs = [
  { key: 'overview', label: 'Overview', icon: 'fas fa-home' },
  { key: 'profile', label: 'Profile Settings', icon: 'fas fa-user-cog' },
  { key: 'password', label: 'Change Password', icon: 'fas fa-lock' },
];

const { activeTab } = useDashboardRoute(tabs, 'overview');

const userName = computed(() => user.value?.firstName || user.value?.firstname || user.value?.username || 'there');

const stats = [
  { label: 'Wishlist Items', value: '—', icon: 'fas fa-heart' },
  { label: 'Orders', value: '—', icon: 'fas fa-receipt' },
  { label: 'Collection', value: '—', icon: 'fas fa-images' },
  { label: 'Messages', value: '—', icon: 'fas fa-envelope' },
];

const quickActions = [
  { key: 'gallery', label: 'Browse Gallery', icon: 'fas fa-palette', to: '/allArtwork' },
  { key: 'wishlist', label: 'Wishlist', icon: 'fas fa-heart', to: '/wishlist' },
  { key: 'cart', label: 'Cart', icon: 'fas fa-shopping-cart', to: '/cart' },
  { key: 'orders', label: 'Orders', icon: 'fas fa-receipt', to: '/account/orders' },
  { key: 'collection', label: 'My Collection', icon: 'fas fa-layer-group', to: '/account/collection' },
  { key: 'auctions', label: 'Auctions', icon: 'fas fa-gavel', to: '/auctions' },
  { key: 'messages', label: 'Messages', icon: 'fas fa-envelope', to: '/messages' },
  { key: 'profile', label: 'Profile', icon: 'fas fa-user-cog', to: { path: '/customerDashboard', query: { tab: 'profile' } } },
];
</script>

<style scoped>
.page-card {
  @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm;
}
</style>
