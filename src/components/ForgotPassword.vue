<template>
  <div class="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10">
    <form
      class="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-8 space-y-5"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ step === 'otp' ? 'Reset password' : 'Forgot password' }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ step === 'otp' ? 'Enter the OTP sent to your email and choose a new password.' : 'Enter your email and we will send a verification code.' }}
      </p>

      <p
        v-if="message"
        class="text-sm rounded-xl px-3 py-2"
        :class="error ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'"
      >
        {{ message }}
      </p>

      <input
        v-model="email"
        type="email"
        required
        placeholder="you@example.com"
        class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
      >

      <template v-if="step === 'otp'">
        <input
          v-model="otp"
          type="text"
          required
          placeholder="OTP code"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
        >
        <input
          v-model="password"
          type="password"
          required
          placeholder="New password"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
        >
        <input
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Confirm new password"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
        >
      </template>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-60"
      >
        {{ loading ? 'Please wait...' : (step === 'otp' ? 'Reset password' : 'Send verification code') }}
      </button>

      <router-link
        to="/userLogin"
        class="block text-center text-sm text-purple-600 dark:text-purple-400"
      >
        Back to login
      </router-link>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';
import { isStrongPassword } from '@/utils/security';

const router = useRouter();
const email = ref('');
const otp = ref('');
const password = ref('');
const confirmPassword = ref('');
const step = ref('email');
const message = ref('');
const error = ref(false);
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  error.value = false;
  message.value = '';
  try {
    if (step.value === 'email') {
      await authService.forgotPassword(email.value);
      step.value = 'otp';
      message.value = 'If that email exists, a verification code has been sent.';
    } else {
      if (password.value !== confirmPassword.value) {
        throw new Error('Passwords do not match');
      }
      if (!isStrongPassword(password.value)) {
        throw new Error('Use 8+ characters with upper, lower, a number, and a special character');
      }
      await authService.resetPassword({
        email: email.value,
        otp: otp.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      });
      message.value = 'Password reset. You can sign in now.';
      router.push('/userLogin');
    }
  } catch (err) {
    error.value = true;
    message.value = err.message || 'Unable to complete password reset.';
  } finally {
    loading.value = false;
  }
};
</script>
