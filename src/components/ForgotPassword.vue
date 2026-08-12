<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10">
    <form class="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 space-y-5" @submit.prevent="requestPasswordReset">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Forgot password</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">Enter your email and we’ll send a reset link.</p>

      <p v-if="message" class="text-sm rounded-xl px-3 py-2" :class="error ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'">
        {{ message }}
      </p>

      <input
        v-model="email"
        type="email"
        required
        placeholder="you@example.com"
        class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-60"
      >
        {{ loading ? 'Sending...' : 'Send reset link' }}
      </button>

      <router-link to="/userLogin" class="block text-center text-sm text-purple-600 dark:text-purple-400">Back to login</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { authService } from '@/services/authService';

const email = ref('');
const message = ref('');
const error = ref(false);
const loading = ref(false);

const requestPasswordReset = async () => {
  loading.value = true;
  error.value = false;
  message.value = '';
  try {
    await authService.forgotPassword(email.value);
    message.value = 'If that email exists, a reset link has been sent.';
  } catch (err) {
    error.value = true;
    message.value = err.message || 'Unable to send reset email.';
  } finally {
    loading.value = false;
  }
};
</script>
