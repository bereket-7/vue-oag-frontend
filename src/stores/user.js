import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userService } from '@/services/userService';
import { normalizeNotification } from '@/utils/normalizers';

export const useUserStore = defineStore('user', () => {
  const profile = ref(null);
  const notifications = ref([]);
  const loading = ref(false);

  const fetchProfile = async () => {
    loading.value = true;
    try {
      profile.value = await userService.getProfile();
      return profile.value;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    profile.value = await userService.updateProfile(profileData);
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

  const prependNotification = (payload) => {
    const item = normalizeNotification({
      id: payload.id || `stomp-${Date.now()}`,
      title: payload.type || 'Notification',
      message: payload.message || payload.body || '',
      type: payload.type || 'info',
      read: false,
      createdAt: payload.createdAt || new Date().toISOString()
    });
    notifications.value = [item, ...notifications.value.filter((n) => n.id !== item.id)];
  };

  return {
    profile,
    notifications,
    loading,
    fetchProfile,
    updateProfile,
    fetchNotifications,
    markNotificationRead,
    prependNotification
  };
});
