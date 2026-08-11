import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userService } from '@/services/userService';

export const useUserStore = defineStore('user', () => {
  const profile = ref(null);
  const notifications = ref([]);
  const loading = ref(false);

  const fetchProfile = async (userId) => {
    loading.value = true;
    try {
      profile.value = await userService.getProfile(userId);
      return profile.value;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (userId, profileData) => {
    profile.value = await userService.updateProfile(userId, profileData);
    return profile.value;
  };

  const fetchNotifications = async () => {
    notifications.value = await userService.getNotifications();
    return notifications.value;
  };

  const markNotificationRead = async (notificationId) => {
    await userService.markNotificationRead(notificationId);
    const notification = notifications.value.find((n) => n.id === notificationId);
    if (notification) notification.read = true;
  };

  return { profile, notifications, loading, fetchProfile, updateProfile, fetchNotifications, markNotificationRead };
});
