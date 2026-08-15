<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
    <div class="page-card max-w-lg w-full p-10 text-center space-y-5">
      <div class="w-16 h-16 mx-auto rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
        <i class="fas fa-check text-2xl text-green-600 dark:text-green-400" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Payment successful
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Thank you. Your transaction has been processed and a receipt is available in your orders.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <router-link
          to="/account/orders"
          class="kelem-btn"
        >
          View orders
        </router-link>
        <router-link
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
        >
          Back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
