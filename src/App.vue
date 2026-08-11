<template>
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg">
    Skip to content
  </a>
  <UserHeader />
    <main id="main-content" class="transition-colors">
    <router-view />
  </main>
  <ToastNotification />
</template>

<script setup>
import UserHeader from '@/views/User/UserHeader.vue';
import ToastNotification from '@/components/common/ToastNotification.vue';
</script>

<style scoped>
#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
