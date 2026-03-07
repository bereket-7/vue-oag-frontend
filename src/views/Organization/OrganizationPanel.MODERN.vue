<template>
  <DashboardLayout
    title="Organization Panel"
    :tabs="tabs"
    :active-tab="activeTab"
    @change-tab="changeTab"
  >
    <div v-if="activeTab === 'Overview'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Events</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalEvents }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-calendar text-xl text-blue-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Upcoming Events</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.upcomingEvents }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-clock text-xl text-green-600"></i>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Registrations</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.registrations }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i class="fas fa-users text-xl text-purple-600"></i>
            </div>
          </div>
        </div>
      </div>

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

    <div v-else-if="activeTab === 'Events'">
      <EventDisplay />
    </div>
    <div v-else-if="activeTab === 'Register Event'">
      <EventRegister />
    </div>
    <div v-else-if="activeTab === 'Update Event'">
      <UpdateEvent />
    </div>
    <div v-else-if="activeTab === 'Profile'">
      <ProfileSetting />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import { BaseCard } from '@/components/common';
import EventDisplay from '@/views/Organization/EventDisplay.vue';
import EventRegister from '@/views/Organization/EventRegister.vue';
import UpdateEvent from '@/views/Organization/UpdateEvent.vue';
import ProfileSetting from '@/views/User/ProfileSetting.vue';

const activeTab = ref('Overview');

const tabs = [
  'Overview',
  'Events',
  'Register Event',
  'Update Event',
  'Profile'
];

const stats = ref({
  totalEvents: 12,
  upcomingEvents: 5,
  registrations: 248
});

const quickActions = [
  { tab: 'Register Event', label: 'New Event', icon: 'fas fa-plus-circle' },
  { tab: 'Events', label: 'View Events', icon: 'fas fa-calendar-alt' },
  { tab: 'Update Event', label: 'Update Event', icon: 'fas fa-edit' },
  { tab: 'Profile', label: 'Profile', icon: 'fas fa-user' }
];

const changeTab = (tab) => {
  activeTab.value = tab;
};
</script>
