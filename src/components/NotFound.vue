<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
    <div class="page-card max-w-lg w-full p-10 text-center space-y-5">
      <p class="text-7xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        404
      </p>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        Page not found
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist or has moved.
      </p>
      <router-link
        to="/"
        class="kelem-btn"
      >
        Back to homepage
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
