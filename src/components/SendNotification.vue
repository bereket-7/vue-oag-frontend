<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
    <PageHeader
      title="Send notification"
      subtitle="Email a user with an update or announcement"
      eyebrow="Communication"
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

      <BaseInput
        v-model="form.email"
        type="email"
        label="Recipient email"
        placeholder="user@example.com"
        required
      />
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Message <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.message"
          rows="6"
          class="form-textarea"
          placeholder="Write something..."
          required
        />
      </div>
      <button
        type="submit"
        class="kelem-btn"
        :disabled="loading"
      >
        <i
          v-if="loading"
          class="fas fa-spinner fa-spin mr-2"
        />
        <i
          v-else
          class="fas fa-paper-plane mr-2"
        />
        Send
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { userService } from '@/services/userService';
import { BaseInput, PageHeader } from '@/components/common';

const form = reactive({ email: '', message: '' });
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const handleSubmit = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await userService.sendNotification({ ...form });
    successMessage.value = 'Notification sent.';
    Object.assign(form, { email: '', message: '' });
  } catch {
    errorMessage.value = 'Failed to send notification.';
  } finally {
    loading.value = false;
  }
};
</script>
