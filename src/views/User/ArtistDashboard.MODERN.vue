<template>
  <DashboardLayout
    title="Artist Dashboard"
    :tabs="tabs"
    :active-tab="activeTab"
    @change-tab="changeTab"
  >
    <div v-if="activeTab === 'My Art'">
      <MyArt />
    </div>
    <div v-else-if="activeTab === 'Profile'">
      <ProfileSetting />
    </div>
    <div v-else-if="activeTab === 'Competition'">
      <DisplayCompetition />
    </div>
    <div v-else-if="activeTab === 'Upload Artwork'">
      <ArtworkUpload />
    </div>
    <div v-else-if="activeTab === 'Change Password'">
      <ChangePassword />
    </div>
    <div v-else-if="activeTab === 'Events'">
      <EventDisplay />
    </div>
    <div v-else-if="activeTab === 'Notification'">
      <NotificationList />
    </div>
    <div v-else-if="activeTab === 'Standard'">
      <UserStandard />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import NotificationList from '@/views/User/NotificationList.vue';
import EventDisplay from '@/views/Organization/EventDisplay.vue';
import ProfileSetting from '@/views/User/ProfileSetting.vue';
import MyArt from '@/views/Artwork/MyArt.vue';
import ArtworkUpload from '@/views/Artwork/ArtworkUpload.vue';
import DisplayCompetition from '@/views/Manager/DisplayCompetition.vue';
import UserStandard from '@/views/User/UserStandard.vue';
import ChangePassword from '@/components/ChangePassword.vue';

const activeTab = ref('My Art');

const tabs = [
  'My Art',
  'Profile',
  'Competition',
  'Change Password',
  'Upload Artwork',
  'Events',
  'Notification',
  'Standard'
];

const changeTab = (tab) => {
  activeTab.value = tab;
};
</script>
