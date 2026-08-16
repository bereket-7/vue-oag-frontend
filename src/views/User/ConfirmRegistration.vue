<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-16 px-4">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>
      <div class="relative max-w-xl mx-auto text-center text-white">
        <p class="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
          Account
        </p>
        <h1 class="text-4xl font-bold mb-3">
          Activate your account
        </h1>
        <p class="text-white/80">
          Enter the confirmation code we sent to your email.
        </p>
      </div>
    </div>

    <div class="max-w-md mx-auto px-4 py-10 -mt-8">
      <div class="page-card p-8">
        <div
          v-if="confirmed"
          class="text-center space-y-4"
        >
          <div class="w-14 h-14 mx-auto rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
            <i class="fas fa-check text-green-600 dark:text-green-400 text-xl" />
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            Registration confirmed
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Your account is active. You can sign in now.
          </p>
          <router-link
            to="/userLogin"
            class="kelem-btn"
          >
            Go to login
          </router-link>
        </div>

        <form
          v-else
          class="space-y-5"
          @submit.prevent="confirmRegistration"
        >
          <div
            v-if="error"
            class="alert-error"
          >
            <i class="fas fa-exclamation-circle mr-2" />{{ error }}
          </div>
          <BaseInput
            v-model="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            required
          />
          <BaseInput
            v-model="confirmationCode"
            label="Confirmation code"
            placeholder="Enter code"
            required
          />
          <button
            type="submit"
            class="kelem-btn w-full"
            :disabled="loading"
          >
            <i
              v-if="loading"
              class="fas fa-spinner fa-spin mr-2"
            />
            Activate
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { authService } from '@/services/authService';
import { BaseInput } from '@/components/common';

const route = useRoute();
const email = ref(route.query.email || '');
const confirmationCode = ref('');
const confirmed = ref(false);
const error = ref('');
const loading = ref(false);

const confirmRegistration = async () => {
  error.value = '';
  loading.value = true;
  try {
    await authService.confirmRegistration({
      username: email.value,
      otp: confirmationCode.value,
      medium: 'EMAIL'
    });
    confirmed.value = true;
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Activation failed';
  } finally {
    loading.value = false;
  }
};
</script>
