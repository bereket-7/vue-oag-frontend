<template>
  <div :class="embedded ? '' : 'min-h-[calc(100vh-5rem)] bg-gray-50 dark:bg-gray-950 py-8 px-4'">
    <div :class="embedded ? 'max-w-lg mx-auto' : 'max-w-lg mx-auto'">
      <PageHeader
        title="Change Password"
        subtitle="Keep your account secure with a strong password"
        eyebrow="Security"
      />

      <form
        class="page-card p-6 sm:p-8 space-y-5"
        @submit.prevent="handleSubmit"
      >
        <div
          v-if="successMessage"
          class="alert-success"
        >
          <i class="fas fa-check-circle mr-2" />{{ successMessage }}
        </div>
        <div
          v-if="errorMessage"
          class="alert-error"
        >
          <i class="fas fa-exclamation-circle mr-2" />{{ errorMessage }}
        </div>

        <!-- Password strength hint -->
        <div class="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50">
          <p class="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-2">
            Password tips
          </p>
          <ul class="text-xs text-purple-600 dark:text-purple-400 space-y-1">
            <li><i class="fas fa-check mr-1.5 opacity-60" />At least 8 characters</li>
            <li><i class="fas fa-check mr-1.5 opacity-60" />Uppercase, lowercase, and a number</li>
            <li><i class="fas fa-check mr-1.5 opacity-60" />Avoid common words</li>
          </ul>
        </div>

        <BaseInput
          v-model="formData.currentPassword"
          type="password"
          label="Current Password"
          :error="errors.currentPassword"
          required
        />
        <BaseInput
          v-model="formData.newPassword"
          type="password"
          label="New Password"
          :error="errors.newPassword"
          hint="At least 8 characters, with upper, lower, and a number"
          required
        />
        <BaseInput
          v-model="formData.confirmPassword"
          type="password"
          label="Confirm New Password"
          :error="errors.confirmPassword"
          required
        />

        <button
          type="submit"
          class="btn-primary w-full"
          :disabled="loading"
        >
          <i
            v-if="loading"
            class="fas fa-spinner fa-spin mr-2"
          />
          Update Password
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { authService } from '@/services/authService';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, PageHeader } from '@/components/common';
import { isStrongPassword } from '@/utils/security';

defineProps({
  embedded: { type: Boolean, default: false }
});

const { success, error: showError } = useNotification();

const formData = reactive({ currentPassword: '', newPassword: '', confirmPassword: '' });
const errors = ref({});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const validateForm = () => {
  errors.value = {};
  if (!formData.currentPassword) errors.value.currentPassword = 'Required';
  if (!formData.newPassword) {
    errors.value.newPassword = 'Required';
  } else if (!isStrongPassword(formData.newPassword)) {
    errors.value.newPassword = 'Use 8+ chars with upper, lower, and a number';
  }
  if (!formData.confirmPassword) {
    errors.value.confirmPassword = 'Required';
  } else if (formData.newPassword !== formData.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
  }
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await authService.changePassword({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });
    successMessage.value = 'Password updated successfully!';
    success('Password updated!');
    formData.currentPassword = '';
    formData.newPassword = '';
    formData.confirmPassword = '';
  } catch (err) {
    errorMessage.value = err.message || 'Failed to change password';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
.btn-primary { @apply inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg shadow-purple-500/20 transition-all; }
.alert-success { @apply flex items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm; }
.alert-error { @apply flex items-center p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm; }
</style>
