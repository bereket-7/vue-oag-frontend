<template>
  <div :class="embedded ? '' : 'p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto'">
    <PageHeader
      title="Contact Users"
      subtitle="Send announcements or direct messages to platform users"
      eyebrow="Communication"
    />

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <form
        class="page-card p-6 sm:p-8 space-y-5 lg:col-span-3"
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
          v-model="form.recipient"
          type="email"
          label="Recipient email"
          placeholder="user@example.com"
          :error="errors.recipient"
          required
        />
        <BaseInput
          v-model="form.subject"
          label="Subject"
          placeholder="Platform update"
          :error="errors.subject"
          required
        />

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message <span class="text-red-500">*</span></label>
          <textarea
            v-model="form.message"
            rows="6"
            class="form-textarea"
            placeholder="Write your message..."
            required
          />
          <p
            v-if="errors.message"
            class="mt-1 text-sm text-red-600"
          >
            {{ errors.message }}
          </p>
        </div>

        <button
          type="submit"
          class="btn-primary"
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
          Send Message
        </button>
      </form>

      <div class="lg:col-span-2 space-y-4">
        <div class="page-card p-5">
          <h3 class="font-bold text-gray-900 dark:text-white mb-3">
            Quick recipients
          </h3>
          <button
            v-for="user in quickRecipients"
            :key="user.email"
            type="button"
            class="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left mb-1"
            @click="form.recipient = user.email"
          >
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold">
              {{ user.label[0] }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                {{ user.label }}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {{ user.email }}
              </p>
            </div>
          </button>
        </div>

        <div class="page-card p-5 bg-gradient-to-br from-purple-600 to-indigo-600 border-0 text-white">
          <i class="fas fa-bullhorn text-xl mb-2 opacity-80" />
          <p class="font-semibold mb-1">
            Broadcast tip
          </p>
          <p class="text-sm text-white/80">
            Use clear subjects and keep messages under a few paragraphs for higher open rates.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, PageHeader } from '@/components/common';

defineProps({
  embedded: { type: Boolean, default: false }
});

const { success, error: showError } = useNotification();

const form = reactive({ recipient: '', subject: '', message: '' });
const errors = ref({});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const quickRecipients = [
  { label: 'Elena (Artist)', email: 'artist@kelem.art' },
  { label: 'Jane (Customer)', email: 'customer@kelem.art' },
  { label: 'Gallery Org', email: 'org@kelem.art' },
  { label: 'Michael (Manager)', email: 'manager@kelem.art' },
];

const validate = () => {
  errors.value = {};
  if (!form.recipient) errors.value.recipient = 'Recipient is required';
  if (!form.subject) errors.value.subject = 'Subject is required';
  if (!form.message) errors.value.message = 'Message is required';
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await new Promise((r) => setTimeout(r, 700));
    successMessage.value = 'Message sent successfully!';
    success('Message sent!');
    Object.assign(form, { recipient: '', subject: '', message: '' });
  } catch {
    errorMessage.value = 'Failed to send message';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
.form-textarea { @apply w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all; }
.btn-primary { @apply inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg shadow-purple-500/20 transition-all; }
.alert-success { @apply flex items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm; }
.alert-error { @apply flex items-center p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm; }
</style>
