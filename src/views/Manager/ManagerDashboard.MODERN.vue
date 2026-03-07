<template>
  <DashboardLayout
    title="Manager Dashboard"
    :tabs="tabs"
    :active-tab="activeTab"
    @change-tab="changeTab"
  >
    <div v-if="activeTab === 'Overview'" class="space-y-6">
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
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <i :class="activity.icon" class="text-blue-600"></i>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </BaseCard>

        <BaseCard title="Quick Actions">
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="action in quickActions"
              :key="action.tab"
              @click="changeTab(action.tab)"
              class="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
            >
              <i :class="action.icon" class="text-2xl text-gray-600 mb-2"></i>
              <p class="text-sm font-medium text-gray-700">{{ action.label }}</p>
            </button>
          </div>
        </BaseCard>
      </div>
    </div>

    <div v-else-if="activeTab === 'Art Request'">
      <VerifyArtwork />
    </div>
    <div v-else-if="activeTab === 'Profile'">
      <ProfileSetting />
    </div>
    <div v-else-if="activeTab === 'Competition'">
      <DisplayCompetition />
    </div>
    <div v-else-if="activeTab === 'Create Competition'">
      <CreateCompetition />
    </div>
    <div v-else-if="activeTab === 'Send Notification'">
      <SendNotification />
    </div>
    <div v-else-if="activeTab === 'Manage Standard'">
      <ManageStandards />
    </div>
    <div v-else-if="activeTab === 'Event Request'">
      <EventDisplay />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import { BaseCard } from '@/components/common';
import EventDisplay from '@/views/Organization/EventDisplay.vue';
import ProfileSetting from '@/views/User/ProfileSetting.vue';
import DisplayCompetition from '@/views/Manager/DisplayCompetition.vue';
import VerifyArtwork from '@/views/Manager/VerifyArtwork.vue';
import ManageStandards from '@/components/ManageStandards.vue';
import SendNotification from '@/components/SendNotification.vue';
import CreateCompetition from '@/views/Manager/CreateCompetition.vue';

const activeTab = ref('Overview');

const tabs = [
  'Overview',
  'Art Request',
  'Profile',
  'Competition',
  'Create Competition',
  'Event Request',
  'Send Notification',
  'Manage Standard'
];

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
  { tab: 'Art Request', label: 'Verify Art', icon: 'fas fa-check-circle' },
  { tab: 'Create Competition', label: 'New Competition', icon: 'fas fa-plus-circle' },
  { tab: 'Send Notification', label: 'Send Alert', icon: 'fas fa-bell' },
  { tab: 'Manage Standard', label: 'Standards', icon: 'fas fa-cog' }
];

const changeTab = (tab) => {
  activeTab.value = tab;
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    yellow: 'bg-yellow-100 text-yellow-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return {
    template: `
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">{{ title }}</p>
            <p class="text-3xl font-bold text-gray-900">{{ value }}</p>
          </div>
          <div :class="['w-12 h-12 rounded-lg flex items-center justify-center', colors[color]]">
            <i :class="icon" class="text-xl"></i>
          </div>
        </div>
      </div>
    `,
    props: ['title', 'value', 'icon', 'color'],
    setup() {
      return { colors };
    }
  };
};

onMounted(() => {
  // Fetch stats
  stats.value = {
    pendingArtworks: 12,
    activeCompetitions: 3,
    eventRequests: 5,
    totalUsers: 248
  };
});
</script>
