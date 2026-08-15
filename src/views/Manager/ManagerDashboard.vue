<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div
      v-if="activeTab.key === 'overview'"
      class="space-y-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Artworks"
          :value="stats.pendingArtworks"
          icon="fas fa-clock"
          color="yellow"
        />
        <StatCard
          title="Active Competitions"
          :value="stats.activeCompetitions"
          icon="fas fa-trophy"
          color="blue"
        />
        <StatCard
          title="Event Requests"
          :value="stats.eventRequests"
          icon="fas fa-calendar"
          color="green"
        />
        <StatCard
          title="Total Users"
          :value="stats.totalUsers"
          icon="fas fa-users"
          color="purple"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BaseCard title="Recent Activities">
          <div class="space-y-3">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
            >
              <div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                <i
                  :class="activity.icon"
                  class="text-blue-600 dark:text-blue-400"
                />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ activity.title }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ activity.time }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard title="Quick Actions">
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="action in quickActions"
              :key="action.key"
              type="button"
              class="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              @click="setTab(tabs.find((t) => t.key === action.key))"
            >
              <i
                :class="action.icon"
                class="text-2xl text-gray-600 dark:text-gray-300 mb-2"
              />
              <p class="text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ action.label }}
              </p>
            </button>
          </div>
        </BaseCard>
      </div>
    </div>

    <VerifyArtwork v-else-if="activeTab.key === 'verify'" />
    <ProfileSetting
      v-else-if="activeTab.key === 'profile'"
      embedded
    />
    <DisplayCompetition
      v-else-if="activeTab.key === 'competition'"
      embedded
    />
    <CreateCompetition v-else-if="activeTab.key === 'create-competition'" />
    <SendNotification v-else-if="activeTab.key === 'notifications'" />
    <ManageStandards v-else-if="activeTab.key === 'standards'" />
    <EventDisplay
      v-else-if="activeTab.key === 'events'"
      embedded
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BaseCard, StatCard } from '@/components/common';
import EventDisplay from '@/views/Organization/EventDisplay.vue';
import ProfileSetting from '@/views/User/ProfileSetting.vue';
import DisplayCompetition from '@/views/Manager/DisplayCompetition.vue';
import VerifyArtwork from '@/views/admin/VerifyArtworkPage.vue';
import ManageStandards from '@/components/ManageStandards.vue';
import SendNotification from '@/components/SendNotification.vue';
import CreateCompetition from '@/views/Manager/CreateCompetition.vue';
import { useDashboardRoute } from '@/composables/useDashboardRoute';

const tabs = [
  { key: 'overview', label: 'Overview', icon: 'fas fa-tachometer-alt' },
  { key: 'verify', label: 'Art Request', icon: 'fas fa-check-circle' },
  { key: 'profile', label: 'Profile', icon: 'fas fa-user-cog' },
  { key: 'competition', label: 'Competition', icon: 'fas fa-trophy' },
  { key: 'create-competition', label: 'Create Competition', icon: 'fas fa-plus-circle' },
  { key: 'events', label: 'Event Request', icon: 'fas fa-calendar' },
  { key: 'notifications', label: 'Send Notification', icon: 'fas fa-bell' },
  { key: 'standards', label: 'Manage Standard', icon: 'fas fa-cog' }
];

const { activeTab, setTab } = useDashboardRoute(tabs, 'overview');

const stats = ref({
  pendingArtworks: 0,
  activeCompetitions: 0,
  eventRequests: 0,
  totalUsers: 0
});

const recentActivities = ref([
  { id: 1, title: 'New artwork submitted', icon: 'fas fa-image', time: '2 hours ago' },
  { id: 2, title: 'Competition created', icon: 'fas fa-trophy', time: '5 hours ago' },
  { id: 3, title: 'Event request received', icon: 'fas fa-calendar', time: '1 day ago' }
]);

const quickActions = [
  { key: 'verify', label: 'Verify Art', icon: 'fas fa-check-circle' },
  { key: 'create-competition', label: 'New Competition', icon: 'fas fa-plus-circle' },
  { key: 'notifications', label: 'Send Alert', icon: 'fas fa-bell' },
  { key: 'standards', label: 'Standards', icon: 'fas fa-cog' }
];

onMounted(() => {
  stats.value = {
    pendingArtworks: 12,
    activeCompetitions: 3,
    eventRequests: 5,
    totalUsers: 248
  };
});
</script>
