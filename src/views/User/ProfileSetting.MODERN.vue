<template>
  <div :class="embedded ? '' : 'min-h-[calc(100vh-5rem)] bg-gray-50 dark:bg-gray-950 py-8 px-4'">
    <div :class="embedded ? '' : 'max-w-5xl mx-auto'">
      <PageHeader
        title="Profile Settings"
        subtitle="Manage your personal information and public profile"
        eyebrow="Account"
      />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Avatar card -->
        <div class="page-card p-6 text-center">
          <div class="relative inline-block mb-4">
            <div class="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-100 dark:ring-purple-900 mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900">
              <img
                v-if="profileImage"
                :src="profileImage"
                alt="Profile"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <i class="fas fa-user text-4xl text-purple-400" />
              </div>
            </div>
            <button
              type="button"
              class="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform"
              @click="profileImageInput?.click()"
            >
              <i class="fas fa-camera text-sm" />
            </button>
            <input ref="profileImageInput" type="file" accept="image/*" class="hidden" @change="handleProfileImageChange" />
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white">{{ formData.firstname }} {{ formData.lastname }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ formData.email }}</p>
          <span class="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 capitalize">
            {{ authStore.role?.toLowerCase() }}
          </span>
        </div>

        <!-- Form -->
        <form class="lg:col-span-2 page-card p-6 sm:p-8 space-y-6" @submit.prevent="handleSubmit">
          <div v-if="successMessage" class="alert-success">{{ successMessage }}</div>
          <div v-if="errorMessage" class="alert-error">{{ errorMessage }}</div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <BaseInput v-model="formData.firstname" label="First Name" :error="errors.firstname" required />
            <BaseInput v-model="formData.lastname" label="Last Name" :error="errors.lastname" required />
          </div>

          <BaseInput v-model="formData.email" type="email" label="Email Address" :error="errors.email" disabled />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <BaseInput v-model="formData.phone" type="tel" label="Phone Number" :error="errors.phone" />
            <BaseInput v-model="formData.age" type="number" label="Age" :error="errors.age" />
          </div>

          <BaseInput v-model="formData.address" label="Address" :error="errors.address" />

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
            <div class="flex gap-3">
              <label
                v-for="option in ['female', 'male']"
                :key="option"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all capitalize text-sm"
                :class="formData.sex === option
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'"
              >
                <input v-model="formData.sex" type="radio" :value="option" class="sr-only" />
                {{ option }}
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Bio</label>
            <textarea
              v-model="formData.bio"
              rows="4"
              class="form-textarea"
              placeholder="Tell collectors about yourself and your artistic journey..."
            />
          </div>

          <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="btn-primary" :disabled="loading">
              <i v-if="loading" class="fas fa-spinner fa-spin mr-2" />
              Save Changes
            </button>
            <button type="button" class="btn-secondary" @click="resetForm">Reset</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, PageHeader } from '@/components/common';

defineProps({
  embedded: { type: Boolean, default: false }
});

const userStore = useUserStore();
const authStore = useAuthStore();
const { success, error: showError } = useNotification();

const profileImageInput = ref(null);
const profileImage = ref(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const errors = ref({});

const formData = reactive({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
  age: '',
  sex: 'female',
  bio: ''
});

const loadProfile = async () => {
  try {
    await userStore.fetchProfile();
    const profile = userStore.profile;
    if (profile) {
      Object.assign(formData, profile);
      profileImage.value = profile.profileImage;
    } else if (authStore.user) {
      Object.assign(formData, authStore.user);
    }
  } catch {
    if (authStore.user) Object.assign(formData, authStore.user);
  }
};

const handleProfileImageChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => { profileImage.value = e.target.result; };
  reader.readAsDataURL(file);
};

const validateForm = () => {
  errors.value = {};
  if (!formData.firstname) errors.value.firstname = 'First name is required';
  if (!formData.lastname) errors.value.lastname = 'Last name is required';
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await userStore.updateProfile(formData);
    authStore.updateUser(formData);
    successMessage.value = 'Profile updated successfully!';
    success('Profile updated!');
  } catch (err) {
    errorMessage.value = err.message || 'Failed to update profile';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  loadProfile();
  successMessage.value = '';
  errorMessage.value = '';
  errors.value = {};
};

onMounted(loadProfile);
</script>

<style scoped>
.page-card {
  @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm;
}
.form-textarea {
  @apply w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none;
}
.btn-primary {
  @apply inline-flex items-center px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 transition-all shadow-lg shadow-purple-500/20;
}
.btn-secondary {
  @apply inline-flex items-center px-6 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all;
}
.alert-success {
  @apply flex items-center gap-2 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm;
}
.alert-error {
  @apply flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm;
}
</style>
