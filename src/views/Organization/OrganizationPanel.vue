<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div
      v-if="activeTab.key === 'overview'"
      class="space-y-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-transparent dark:border-gray-800">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Events
              </p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">
                {{ stats.totalEvents }}
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
              <i class="fas fa-calendar text-xl text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-transparent dark:border-gray-800">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Upcoming Events
              </p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">
                {{ stats.upcomingEvents }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
              <i class="fas fa-clock text-xl text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-transparent dark:border-gray-800">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Registrations
              </p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white">
                {{ stats.registrations }}
              </p>
            </div>
            <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
              <i class="fas fa-users text-xl text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <BaseCard title="Quick Actions">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            v-for="action in quickActions"
            :key="action.key"
            type="button"
            class="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all text-center"
            @click="setTab(tabs.find((t) => t.key === action.key))"
          >
            <i
              :class="action.icon"
              class="text-3xl text-gray-600 dark:text-gray-300 mb-2"
            />
            <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
              {{ action.label }}
            </p>
          </button>
        </div>
      </BaseCard>
    </div>

    <EventDisplay
      v-else-if="activeTab.key === 'events'"
      embedded
    />
    <EventRegister v-else-if="activeTab.key === 'register-event'" />
    <UpdateEvent v-else-if="activeTab.key === 'update-event'" />
    <ProfileSetting
      v-else-if="activeTab.key === 'profile'"
      embedded
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BaseCard } from '@/components/common';
import EventDisplay from '@/views/Organization/EventDisplay.vue';
import EventRegister from '@/views/Organization/EventRegister.vue';
import UpdateEvent from '@/views/Organization/UpdateEvent.vue';
import ProfileSetting from '@/views/User/ProfileSetting.vue';
import { useDashboardRoute } from '@/composables/useDashboardRoute';

const tabs = [
  { key: 'overview', label: 'Overview', icon: 'fas fa-building' },
  { key: 'events', label: 'Events', icon: 'fas fa-calendar-alt' },
  { key: 'register-event', label: 'Register Event', icon: 'fas fa-plus-circle' },
  { key: 'update-event', label: 'Update Event', icon: 'fas fa-edit' },
  { key: 'profile', label: 'Profile', icon: 'fas fa-user' }
];

const { activeTab, setTab } = useDashboardRoute(tabs, 'overview');

const stats = ref({
  totalEvents: 12,
  upcomingEvents: 5,
  registrations: 248
});

const quickActions = [
  { key: 'register-event', label: 'New Event', icon: 'fas fa-plus-circle' },
  { key: 'events', label: 'View Events', icon: 'fas fa-calendar-alt' },
  { key: 'update-event', label: 'Update Event', icon: 'fas fa-edit' },
  { key: 'profile', label: 'Profile', icon: 'fas fa-user' }
];
</script>
