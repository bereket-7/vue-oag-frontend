<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
    <div class="page-card max-w-lg w-full p-10 text-center space-y-5">
      <div class="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
        <i class="fas fa-envelope-open-text text-2xl text-green-600 dark:text-green-400" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        You are registered
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Check your email for an activation code, then confirm your account to start exploring KELEM.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <router-link
          to="/activateAccount"
          class="kelem-btn"
        >
          Activate account
        </router-link>
        <router-link
          to="/userLogin"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
