<template>
  <DashboardLayout
    title="Artist Dashboard"
    :tabs="tabs"
    :active-tab="activeTab"
    @change-tab="setTab"
  >
    <MyArt v-if="activeTab.key === 'my-art'" @upload="setTab(tabs.find(t => t.key === 'upload'))" />
    <ProfileSetting v-else-if="activeTab.key === 'profile'" embedded />
    <DisplayCompetition v-else-if="activeTab.key === 'competition'" embedded />
    <ArtworkUpload v-else-if="activeTab.key === 'upload'" embedded @uploaded="onUploaded" />
    <ChangePassword v-else-if="activeTab.key === 'password'" embedded />
    <EventDisplay v-else-if="activeTab.key === 'events'" embedded />
    <NotificationList v-else-if="activeTab.key === 'notifications'" embedded />
    <UserStandard v-else-if="activeTab.key === 'standards'" embedded />
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import NotificationList from '@/views/User/NotificationList.MODERN.vue';
import EventDisplay from '@/views/Organization/EventDisplay.MODERN.vue';
import ProfileSetting from '@/views/User/ProfileSetting.MODERN.vue';
import MyArt from '@/views/Artwork/MyArt.MODERN.vue';
import ArtworkUpload from '@/views/Artwork/ArtworkUpload.MODERN.vue';
import DisplayCompetition from '@/views/Manager/DisplayCompetition.vue';
import UserStandard from '@/views/User/UserStandard.MODERN.vue';
import ChangePassword from '@/components/ChangePassword.MODERN.vue';
import { useDashboardRoute } from '@/composables/useDashboardRoute';

const tabs = [
  { key: 'my-art', label: 'My Artworks', icon: 'fas fa-palette' },
  { key: 'upload', label: 'Upload Artwork', icon: 'fas fa-cloud-upload-alt' },
  { key: 'profile', label: 'Profile Settings', icon: 'fas fa-user-cog' },
  { key: 'competition', label: 'Competitions', icon: 'fas fa-trophy' },
  { key: 'password', label: 'Change Password', icon: 'fas fa-lock' },
  { key: 'events', label: 'Events', icon: 'fas fa-calendar-alt' },
  { key: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
  { key: 'standards', label: 'Standards', icon: 'fas fa-book' },
];

const { activeTab, setTab } = useDashboardRoute(tabs, 'my-art');

const onUploaded = () => setTab(tabs.find((t) => t.key === 'my-art'));
</script>
