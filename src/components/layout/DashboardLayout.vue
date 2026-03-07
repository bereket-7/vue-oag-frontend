<template>
  <div class="min-h-screen bg-gray-50">
    <div class="flex">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out mt-16',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        ]"
      >
        <div class="h-full flex flex-col">
          <div class="p-6 border-b">
            <h2 class="text-xl font-bold text-gray-900">{{ title }}</h2>
          </div>

          <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="changeTab(tab)"
              :class="[
                'w-full text-left px-4 py-3 rounded-lg transition-colors',
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              ]"
            >
              <i v-if="tab.icon" :class="tab.icon" class="mr-3"></i>
              {{ tab.label || tab }}
            </button>
          </nav>

          <div class="p-4 border-t">
            <button
              @click="showLogoutDialog = true"
              class="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <i class="fas fa-sign-out-alt mr-3"></i>
              Logout
            </button>
          </div>
        </div>
      </aside>

      <!-- Mobile sidebar overlay -->
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
      ></div>

      <!-- Main content -->
      <div class="flex-1 lg:ml-64">
        <!-- Mobile header -->
        <div class="lg:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-30 p-4">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="text-gray-600 hover:text-gray-900"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>

        <!-- Content area -->
        <main class="p-6 mt-16 lg:mt-0">
          <slot />
        </main>
      </div>
    </div>

    <!-- Logout confirmation modal -->
    <BaseModal v-model="showLogoutDialog" title="Confirm Logout" size="sm">
      <p class="text-gray-700">Are you sure you want to logout?</p>
      
      <template #footer>
        <BaseButton variant="secondary" @click="showLogoutDialog = false">
          Cancel
        </BaseButton>
        <BaseButton variant="danger" @click="handleLogout">
          Logout
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { BaseModal, BaseButton } from '@/components/common';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tabs: {
    type: Array,
    required: true
  },
  activeTab: {
    type: [String, Object],
    required: true
  }
});

const emit = defineEmits(['change-tab']);

const router = useRouter();
const { logout } = useAuth();

const sidebarOpen = ref(false);
const showLogoutDialog = ref(false);

const changeTab = (tab) => {
  emit('change-tab', tab);
  sidebarOpen.value = false;
};

const handleLogout = () => {
  logout();
  showLogoutDialog.value = false;
};
</script>
