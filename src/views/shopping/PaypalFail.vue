<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16">
    <div class="page-card max-w-lg w-full p-10 text-center space-y-5">
      <div class="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
        <i class="fas fa-ban text-2xl text-amber-600 dark:text-amber-400" />
      </div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        Payment cancelled
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        The payment was cancelled. Your cart is still saved if you want to try again.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <router-link
          to="/checkout"
          class="kelem-btn"
        >
          Return to checkout
        </router-link>
        <router-link
          to="/cart"
          class="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
        >
          View cart
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
