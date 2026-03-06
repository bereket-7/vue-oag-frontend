import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';

export const useUserStore = defineStore('user', () => {
  const profile = ref(null);
  const notifications = ref([]);
  const loading = ref(false);

  const fetchProfile = async () => {
    loading.value = true;
    try {
      const response = await api.get('/user/profile');
      profile.value = response.data;
      return response.data;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    const response = await api.put('/user/profile', profileData);
    profile.value = response.data;
    return response.data;
  };

  const fetchNotifications = async () => {
    const response = await api.get('/user/notifications');
    notifications.value = response.data;
    return response.data;
  };

  const markNotificationRead = async (notificationId) => {
    await api.put(`/user/notifications/${notificationId}/read`);
    const notification = notifications.value.find(n => n.id === notificationId);
    if (notification) notification.read = true;
  };

  return {
    profile,
    notifications,
    loading,
    fetchProfile,
    updateProfile,
    fetchNotifications,
    markNotificationRead
  };
});
