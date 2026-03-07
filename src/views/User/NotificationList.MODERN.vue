<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Notifications</h2>
      <BaseButton v-if="unreadCount > 0" variant="outline" size="sm" @click="markAllRead">
        Mark all as read
      </BaseButton>
    </div>

    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else-if="notifications.length === 0" class="text-center py-12">
      <i class="fas fa-bell-slash text-6xl text-gray-300 mb-4"></i>
      <p class="text-gray-500">No notifications yet</p>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg',
          !notification.read && 'border-l-4 border-blue-500'
        ]"
      >
        <div class="flex items-start gap-4">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
            getNotificationColor(notification.type)
          ]">
            <i :class="getNotificationIcon(notification.type)"></i>
          </div>

          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-semibold text-gray-900">{{ notification.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
                <p class="text-xs text-gray-400 mt-2">{{ formatTime(notification.createdAt) }}</p>
              </div>
              
              <button
                v-if="!notification.read"
                @click="markAsRead(notification.id)"
                class="text-blue-600 hover:text-blue-700 text-sm"
              >
                Mark read
              </button>
            </div>
          </div>

          <button
            @click="deleteNotification(notification.id)"
            class="text-gray-400 hover:text-red-600"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useNotification } from '@/composables/useNotification';
import { BaseButton, LoadingSpinner } from '@/components/common';

const userStore = useUserStore();
const { success } = useNotification();

const loading = ref(false);

const notifications = computed(() => userStore.notifications);
const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

const getNotificationIcon = (type) => {
  const icons = {
    info: 'fas fa-info-circle',
    success: 'fas fa-check-circle',
    warning: 'fas fa-exclamation-triangle',
    error: 'fas fa-times-circle',
    message: 'fas fa-envelope'
  };
  return icons[type] || icons.info;
};

const getNotificationColor = (type) => {
  const colors = {
    info: 'bg-blue-100 text-blue-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    error: 'bg-red-100 text-red-600',
    message: 'bg-purple-100 text-purple-600'
  };
  return colors[type] || colors.info;
};

const formatTime = (date) => {
  const now = new Date();
  const notifDate = new Date(date);
  const diff = Math.floor((now - notifDate) / 1000);
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const markAsRead = async (id) => {
  await userStore.markNotificationRead(id);
  success('Marked as read');
};

const markAllRead = async () => {
  for (const notification of notifications.value) {
    if (!notification.read) {
      await userStore.markNotificationRead(notification.id);
    }
  }
  success('All notifications marked as read');
};

const deleteNotification = async (id) => {
  // Implement delete logic
  success('Notification deleted');
};

onMounted(() => {
  loading.value = true;
  userStore.fetchNotifications().finally(() => loading.value = false);
});
</script>
