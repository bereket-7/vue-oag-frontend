<template>
  <div :class="embedded ? '' : 'p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto'">
    <PageHeader
      title="Register Organization"
      subtitle="Onboard a gallery or partner organization to KELEM"
      eyebrow="Administration"
    />

    <form class="page-card p-6 sm:p-8 space-y-5" @submit.prevent="handleSubmit">
      <div v-if="successMessage" class="alert-success">
        <i class="fas fa-check-circle mr-2" />{{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert-error">
        <i class="fas fa-exclamation-circle mr-2" />{{ errorMessage }}
      </div>

      <div class="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50">
        <p class="text-sm text-purple-700 dark:text-purple-300">
          <i class="fas fa-info-circle mr-1.5" />
          Organizations can host events and manage group exhibitions after approval.
        </p>
      </div>

      <BaseInput v-model="form.name" label="Organization Name" placeholder="Heritage Gallery" :error="errors.name" required />
      <BaseInput v-model="form.email" type="email" label="Email" placeholder="hello@gallery.et" :error="errors.email" required />
      <BaseInput v-model="form.phone" type="tel" label="Phone" placeholder="0912345678" :error="errors.phone" required />
      <BaseInput v-model="form.address" label="Address" placeholder="Bole, Addis Ababa" :error="errors.address" required />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <BaseInput v-model="form.password" type="password" label="Password" placeholder="••••••••" :error="errors.password" hint="At least 8 characters, with upper, lower, and a number" required />
        <BaseInput v-model="form.confirmPassword" type="password" label="Confirm Password" placeholder="••••••••" :error="errors.confirmPassword" required />
      </div>

      <p v-if="passwordError" class="text-sm text-red-600 dark:text-red-400">{{ passwordError }}</p>

      <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="loading">
        <i v-if="loading" class="fas fa-spinner fa-spin mr-2" />
        <i v-else class="fas fa-building mr-2" />
        Register Organization
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, PageHeader } from '@/components/common';
import { isStrongPassword } from '@/utils/security';

const props = defineProps({
  embedded: { type: Boolean, default: false }
});

const router = useRouter();
const { success, error: showError } = useNotification();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: ''
});

const errors = ref({});
const passwordError = ref('');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const validate = () => {
  errors.value = {};
  passwordError.value = '';
  if (!form.name) errors.value.name = 'Organization name is required';
  if (!form.email) errors.value.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.value.email = 'Invalid email';
  if (!form.phone) errors.value.phone = 'Phone is required';
  else if (!/^(09|07)\d{8}$/.test(form.phone) && !/^\+2519\d{8}$/.test(form.phone)) {
    errors.value.phone = 'Invalid phone format';
  }
  if (!form.address) errors.value.address = 'Address is required';
  if (!form.password) errors.value.password = 'Password is required';
  else if (!isStrongPassword(form.password)) passwordError.value = 'Use 8+ characters with upper, lower, and a number';
  if (!form.confirmPassword) errors.value.confirmPassword = 'Please confirm password';
  else if (form.password !== form.confirmPassword) passwordError.value = 'Passwords do not match';
  return Object.keys(errors.value).length === 0 && !passwordError.value;
};

const handleSubmit = async () => {
  if (!validate()) return;
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await authService.register({
      firstname: form.name,
      lastname: 'Org',
      email: form.email,
      phone: form.phone,
      address: form.address,
      password: form.password,
      role: 'ORGANIZATION',
      username: form.email.split('@')[0]
    });
    successMessage.value = 'Organization registered successfully!';
    success('Organization registered!');
    Object.assign(form, { name: '', email: '', phone: '', address: '', password: '', confirmPassword: '' });
    if (!props.embedded) {
      setTimeout(() => router.push({ path: '/adminDashboard', query: { tab: 'organizations' } }), 1200);
    }
  } catch (err) {
    errorMessage.value = err.message || 'Registration failed';
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
