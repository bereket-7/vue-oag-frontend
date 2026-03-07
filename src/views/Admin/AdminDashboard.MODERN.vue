<template>
  <DashboardLayout
    title="Admin Dashboard"
    :tabs="tabs"
    :active-tab="activeTab"
    @change-tab="changeTab"
  >
    <div v-if="activeTab === 'Overview'" class="space-y-6">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Artists</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.artists }}</p>
              <p class="text-xs text-green-600 mt-1">+12% this month</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-palette text-xl text-purple-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Customers</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.customers }}</p>
              <p class="text-xs text-green-600 mt-1">+8% this month</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-users text-xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Organizations</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.organizations }}</p>
              <p class="text-xs text-green-600 mt-1">+3 new</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-building text-xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Managers</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.managers }}</p>
              <p class="text-xs text-gray-600 mt-1">Active</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-user-tie text-xl text-yellow-600"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts & Tables -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BaseCard title="User Growth">
          <div class="h-64 flex items-center justify-center text-gray-500">
            <p>Chart placeholder - Integrate Chart.js or similar</p>
          </div>
        </BaseCard>

        <BaseCard title="Recent Registrations">
          <div class="space-y-3">
            <div v-for="user in recentUsers" :key="user.id" class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <img :src="user.avatar" alt="" class="w-10 h-10 rounded-full" />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
                  <p class="text-xs text-gray-500">{{ user.role }}</p>
                </div>
              </div>
              <span class="text-xs text-gray-500">{{ user.time }}</span>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Quick Actions -->
      <BaseCard title="Quick Actions">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            v-for="action in quickActions"
            :key="action.tab"
            @click="changeTab(action.tab)"
            class="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <i :class="action.icon" class="text-3xl text-gray-600 mb-2"></i>
            <p class="text-sm font-medium text-gray-700">{{ action.label }}</p>
          </button>
        </div>
      </BaseCard>
    </div>

    <div v-else-if="activeTab === 'Artists'">
      <ArtistList />
    </div>
    <div v-else-if="activeTab === 'Customers'">
      <CustomerList />
    </div>
    <div v-else-if="activeTab === 'Organization'">
      <OrganizationList />
    </div>
    <div v-else-if="activeTab === 'Register Organization'">
      <RegisterOrganization />
    </div>
    <div v-else-if="activeTab === 'Managers'">
      <ManagerList />
    </div>
    <div v-else-if="activeTab === 'Contact'">
      <ContactUser />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import { BaseCard } from '@/components/common';
import ArtistList from '@/views/Admin/ArtistList.vue';
import CustomerList from '@/views/Admin/ArtistList.vue';
import OrganizationList from '@/views/Admin/OrganizationList.vue';
import ManagerList from '@/views/Admin/OrganizationList.vue';
import RegisterOrganization from '@/views/Organization/RegisterOrganization.vue';
import ContactUser from '@/views/Manager/ContactUser.vue';

const activeTab = ref('Overview');

const tabs = [
  'Overview',
  'Artists',
  'Customers',
  'Organization',
  'Register Organization',
  'Managers',
  'Contact'
];

const stats = ref({
  artists: 0,
  customers: 0,
  organizations: 0,
  managers: 0
});

const recentUsers = ref([
  { id: 1, name: 'John Doe', role: 'Artist', avatar: 'https://via.placeholder.com/40', time: '2h ago' },
  { id: 2, name: 'Jane Smith', role: 'Customer', avatar: 'https://via.placeholder.com/40', time: '5h ago' },
  { id: 3, name: 'Art Gallery Inc', role: 'Organization', avatar: 'https://via.placeholder.com/40', time: '1d ago' }
]);

const quickActions = [
  { tab: 'Artists', label: 'Manage Artists', icon: 'fas fa-palette' },
  { tab: 'Customers', label: 'View Customers', icon: 'fas fa-users' },
  { tab: 'Organization', label: 'Organizations', icon: 'fas fa-building' },
  { tab: 'Contact', label: 'Contact Users', icon: 'fas fa-envelope' }
];

const changeTab = (tab) => {
  activeTab.value = tab;
};

onMounted(() => {
  stats.value = {
    artists: 156,
    customers: 892,
    organizations: 24,
    managers: 12
  };
});
</script>
