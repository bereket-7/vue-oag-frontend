<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
    <div class="page-card max-w-lg w-full p-10 text-center space-y-5">
      <div class="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
        <i class="fas fa-times text-2xl text-red-600 dark:text-red-400" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Payment error
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Something went wrong during checkout. You can try again or contact support.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <router-link
          to="/checkout"
          class="kelem-btn"
        >
          Try again
        </router-link>
        <router-link
          to="/contactUs"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
        >
          Contact support
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
