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
        <!-- Sidebar header -->
        <div class="p-5 border-b border-gray-100 dark:border-gray-800">
          <p class="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
            Dashboard
          </p>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white truncate">
            {{ title }}
          </h2>
        </div>

        <!-- Nav -->
        <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
          <button
            v-for="tab in normalizedTabs"
            :key="tab.key"
            type="button"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
              isActive(tab)
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                : 'text-gray-600 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300'
            ]"
            @click="selectTab(tab)"
          >
            <i
              v-if="tab.icon"
              :class="tab.icon"
              class="w-4 text-center shrink-0"
            />
            <span class="truncate">{{ tab.label }}</span>
          </button>
        </nav>

        <!-- Logout -->
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

      <!-- Mobile overlay -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 top-16 bg-gray-900/50 backdrop-blur-sm z-30 lg:hidden"
        @click="sidebarOpen = false"
      />

      <!-- Main -->
      <div class="flex-1 lg:ml-64 min-w-0">
        <!-- Mobile toggle bar -->
        <div class="lg:hidden sticky top-16 z-20 flex items-center gap-3 px-4 py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            aria-label="Toggle sidebar"
            @click="sidebarOpen = !sidebarOpen"
          >
            <i class="fas fa-bars" />
          </button>
          <span class="font-semibold text-gray-900 dark:text-white truncate">{{ typeof activeTab === 'string' ? activeTab : activeTab?.label }}</span>
        </div>

        <main class="p-4 sm:p-6 lg:p-8">
          <slot />
        </main>
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
import { useAuth } from '@/composables/useAuth';
import { BaseModal, BaseButton } from '@/components/common';

const props = defineProps({
  title: { type: String, required: true },
  tabs: { type: Array, required: true },
  activeTab: { type: [String, Object], required: true }
});

const emit = defineEmits(['change-tab']);

const { logout } = useAuth();
const sidebarOpen = ref(false);
const showLogoutDialog = ref(false);

const normalizeTab = (tab) => {
  if (typeof tab === 'string') return { key: tab, label: tab, icon: null };
  return tab;
};

const normalizedTabs = computed(() => props.tabs.map(normalizeTab));

const currentKey = computed(() => {
  if (typeof props.activeTab === 'string') return props.activeTab;
  return props.activeTab?.key;
});

const isActive = (tab) => currentKey.value === tab.key;

const selectTab = (tab) => {
  emit('change-tab', typeof props.tabs[0] === 'string' ? tab.label : tab);
  sidebarOpen.value = false;
};

const handleLogout = () => {
  logout();
  showLogoutDialog.value = false;
};
</script>
