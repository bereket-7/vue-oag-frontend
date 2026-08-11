<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
    <PageHeader
      title="Apply for Competition"
      subtitle="Submit your artwork to compete in the current KELEM art challenge"
      eyebrow="Competition Entry"
    />

    <div v-if="competition" class="page-card p-5 mb-6 border-l-4 border-l-purple-500">
      <p class="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">Entering</p>
      <h3 class="font-bold text-gray-900 dark:text-white">{{ competition.title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ competition.description }}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">
        <i class="fas fa-calendar mr-1" />Deadline: {{ formatDate(competition.endDate) }}
      </p>
    </div>

    <form class="page-card p-6 sm:p-8 space-y-5" @submit.prevent="handleSubmit">
      <div v-if="successMessage" class="alert-success">
        <i class="fas fa-check-circle mr-2" />{{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert-error">
        <i class="fas fa-exclamation-circle mr-2" />{{ errorMessage }}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <BaseInput v-model="form.firstName" label="First Name" placeholder="John" :error="errors.firstName" required />
        <BaseInput v-model="form.lastName" label="Last Name" placeholder="Doe" :error="errors.lastName" required />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <BaseInput v-model="form.email" type="email" label="Email" placeholder="you@example.com" :error="errors.email" required />
        <BaseInput v-model="form.phone" type="tel" label="Phone" placeholder="0912345678" :error="errors.phone" required />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category <span class="text-red-500">*</span></label>
        <select v-model="form.category" class="form-select" required>
          <option value="">Select category</option>
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">{{ cat.label }}</option>
        </select>
        <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Artwork Description <span class="text-red-500">*</span></label>
        <textarea
          v-model="form.artDescription"
          rows="4"
          class="form-textarea"
          placeholder="Describe your submission — concept, medium, dimensions..."
          required
        />
        <p v-if="errors.artDescription" class="mt-1 text-sm text-red-600">{{ errors.artDescription }}</p>
      </div>

      <!-- Image upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Artwork Image <span class="text-red-500">*</span></label>
        <div
          class="border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer border-gray-200 dark:border-gray-700 hover:border-purple-400"
          @click="!imagePreview && fileInput?.click()"
        >
          <div v-if="!imagePreview">
            <i class="fas fa-image text-3xl text-gray-400 mb-2" />
            <p class="text-sm text-gray-500 dark:text-gray-400">Click to upload your artwork image</p>
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />
          </div>
          <div v-else class="relative inline-block">
            <img :src="imagePreview" alt="Preview" class="max-h-48 rounded-xl" />
            <button type="button" class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs" @click.stop="clearImage">
              <i class="fas fa-times" />
            </button>
          </div>
        </div>
        <p v-if="errors.image" class="mt-1 text-sm text-red-600">{{ errors.image }}</p>
      </div>

      <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="loading">
        <i v-if="loading" class="fas fa-spinner fa-spin mr-2" />
        <i v-else class="fas fa-paper-plane mr-2" />
        Submit Application
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { competitionService } from '@/services/competitionService';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, PageHeader } from '@/components/common';

const router = useRouter();
const authStore = useAuthStore();
const { success, error: showError } = useNotification();

const fileInput = ref(null);
const imageFile = ref(null);
const imagePreview = ref(null);
const competition = ref(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const errors = ref({});

const categories = [
  { value: 'painting', label: 'Painting' },
  { value: 'sculpture', label: 'Sculpture' },
  { value: 'mixed-media', label: 'Mixed Media' },
  { value: 'digital-art', label: 'Digital Art' },
];

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  category: '',
  artDescription: '',
});

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

onMounted(async () => {
  const u = authStore.user;
  if (u) {
    form.firstName = u.firstName || u.firstname || '';
    form.lastName = u.lastName || u.lastname || '';
    form.email = u.email || '';
    form.phone = u.phone || '';
  }
  try {
    const list = await competitionService.getAll();
    competition.value = list.find((c) => c.status === 'active') || list[0] || null;
  } catch { /* ignore */ }
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 10 * 1024 * 1024) {
    errors.value.image = 'Image must be under 10MB';
    return;
  }
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = (ev) => { imagePreview.value = ev.target.result; };
  reader.readAsDataURL(file);
  errors.value.image = '';
};

const clearImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
  if (fileInput.value) fileInput.value.value = '';
};

const validate = () => {
  errors.value = {};
  if (!form.firstName) errors.value.firstName = 'Required';
  if (!form.lastName) errors.value.lastName = 'Required';
  if (!form.email) errors.value.email = 'Required';
  if (!form.phone) errors.value.phone = 'Required';
  if (!form.category) errors.value.category = 'Required';
  if (!form.artDescription) errors.value.artDescription = 'Required';
  if (!imageFile.value) errors.value.image = 'Please upload an image';
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  try {
    await competitionService.register(competition.value?.id || 1, null);
    successMessage.value = 'Your application has been submitted successfully!';
    success('Application submitted!');
    setTimeout(() => router.push({ path: '/artistDashboard', query: { tab: 'competition' } }), 1500);
  } catch (err) {
    errorMessage.value = err.message || 'Registration failed. Please try again.';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
.form-textarea { @apply w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all; }
.form-select { @apply w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none; }
.btn-primary { @apply inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg shadow-purple-500/20 transition-all; }
.alert-success { @apply flex items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm; }
.alert-error { @apply flex items-center p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm; }
</style>
