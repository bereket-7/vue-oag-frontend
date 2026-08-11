<template>
  <AuthenticatedShell v-if="showShell">
    <router-view />
  </AuthenticatedShell>
  <router-view v-else />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AuthenticatedShell from '@/components/layout/AuthenticatedShell.vue';

const route = useRoute();
const authStore = useAuthStore();

const showShell = computed(() => {
  if (!authStore.isAuthenticated) return false;
  if (route.meta.guestOnly) return false;
  if (route.meta.noShell) return false;
  return true;
});
</script>
