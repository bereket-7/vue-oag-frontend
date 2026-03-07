<template>
  <div class="max-w-md mx-auto">
    <BaseCard title="Change Password">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ errorMessage }}
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
          hint="At least 6 characters"
          required
        />

        <BaseInput
          v-model="formData.confirmPassword"
          type="password"
          label="Confirm New Password"
          :error="errors.confirmPassword"
          required
        />

        <BaseButton
          type="submit"
          variant="primary"
          size="lg"
          :loading="loading"
          full-width
        >
          Update Password
        </BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useNotification } from '@/composables/useNotification';
import { BaseCard, BaseInput, BaseButton } from '@/components/common';
import api from '@/services/api';

const { success, error: showError } = useNotification();

const formData = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const errors = ref({});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const validateForm = () => {
  errors.value = {};
  
  if (!formData.currentPassword) errors.value.currentPassword = 'Current password is required';
  if (!formData.newPassword) {
    errors.value.newPassword = 'New password is required';
  } else if (formData.newPassword.length < 6) {
    errors.value.newPassword = 'Password must be at least 6 characters';
  }
  if (!formData.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password';
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
    await api.post('/auth/change-password', {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    });
    
    successMessage.value = 'Password changed successfully!';
    success('Password updated!');
    
    formData.currentPassword = '';
    formData.newPassword = '';
    formData.confirmPassword = '';
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Failed to change password';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>
