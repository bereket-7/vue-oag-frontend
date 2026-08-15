<template>
  <div :class="embedded ? '' : 'min-h-[calc(100vh-5rem)] bg-gray-50 dark:bg-gray-950 py-8 px-4'">
    <div :class="embedded ? '' : 'max-w-3xl mx-auto'">
      <PageHeader
        title="Upload Artwork"
        subtitle="Share your creation with collectors worldwide"
        eyebrow="Artist"
      />

      <form
        class="page-card p-6 sm:p-8 space-y-6"
        @submit.prevent="handleSubmit"
      >
        <!-- Image dropzone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Artwork Image <span class="text-red-500">*</span>
          </label>
          <div
            :class="[
              'relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer',
              isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600'
            ]"
            @drop.prevent="handleDrop"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @click="!imagePreview && fileInput?.click()"
          >
            <div v-if="!imagePreview">
              <div class="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-cloud-upload-alt text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <p class="text-gray-700 dark:text-gray-300 font-medium mb-1">
                Drag & drop your artwork here
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
                or click to browse · PNG, JPG up to 10MB
              </p>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleFileSelect"
              >
              <span class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700">
                Browse Files
              </span>
            </div>
            <div
              v-else
              class="relative inline-block"
            >
              <img
                :src="imagePreview"
                alt="Preview"
                class="max-h-72 rounded-xl shadow-lg"
              >
              <button
                type="button"
                class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg"
                @click.stop="removeImage"
              >
                <i class="fas fa-times text-sm" />
              </button>
            </div>
          </div>
          <p
            v-if="errors.image"
            class="mt-1.5 text-sm text-red-600 dark:text-red-400"
          >
            {{ errors.image }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <BaseInput
            v-model="formData.artworkName"
            label="Artwork Title"
            placeholder="Enter title"
            :error="errors.artworkName"
            required
          />
          <BaseInput
            v-model="formData.price"
            type="number"
            label="Price ($)"
            placeholder="0.00"
            :error="errors.price"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description <span class="text-red-500">*</span></label>
          <textarea
            v-model="formData.artworkDescription"
            rows="4"
            class="form-textarea"
            placeholder="Describe your artwork, inspiration, and technique..."
            required
          />
          <p
            v-if="errors.artworkDescription"
            class="mt-1 text-sm text-red-600"
          >
            {{ errors.artworkDescription }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category <span class="text-red-500">*</span></label>
            <select
              v-model="formData.artworkCategory"
              class="form-select"
              required
            >
              <option value="">
                Select category
              </option>
              <option
                v-for="cat in categories"
                :key="cat"
                :value="cat"
              >
                {{ cat }}
              </option>
            </select>
          </div>
          <BaseInput
            v-model="formData.size"
            label="Size"
            placeholder="e.g., 24×36 inches"
          />
        </div>

        <BaseInput
          v-model="formData.medium"
          label="Medium"
          placeholder="e.g., Oil on canvas"
        />

        <div
          v-if="errorMessage"
          class="alert-error"
        >
          {{ errorMessage }}
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            class="btn-primary flex-1 sm:flex-none"
            :disabled="loading"
          >
            <i
              v-if="loading"
              class="fas fa-spinner fa-spin mr-2"
            />
            Upload Artwork
          </button>
          <button
            v-if="!embedded"
            type="button"
            class="btn-secondary"
            @click="$router.back()"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { artworkService } from '@/services/artworkService';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, PageHeader } from '@/components/common';

const props = defineProps({
  embedded: { type: Boolean, default: false }
});

const emit = defineEmits(['uploaded']);

const router = useRouter();
const { success, error: showError } = useNotification();

const fileInput = ref(null);
const imageFile = ref(null);
const imagePreview = ref(null);
const isDragging = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const errors = ref({});

const categories = ['Painting', 'Sculpture', 'Photography', 'Digital Art', 'Mixed Media'];

const formData = reactive({
  artworkName: '',
  artworkDescription: '',
  price: '',
  artworkCategory: '',
  size: '',
  medium: ''
});

const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (file) processFile(file);
};

const handleDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  if (file?.type.startsWith('image/')) processFile(file);
};

const processFile = (file) => {
  if (file.size > 10 * 1024 * 1024) {
    errors.value.image = 'File must be under 10MB';
    return;
  }
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => { imagePreview.value = e.target.result; };
  reader.readAsDataURL(file);
  errors.value.image = '';
};

const removeImage = () => {
  imageFile.value = null;
  imagePreview.value = null;
  if (fileInput.value) fileInput.value.value = '';
};

const validateForm = () => {
  errors.value = {};
  if (!imageFile.value) errors.value.image = 'Please select an image';
  if (!formData.artworkName) errors.value.artworkName = 'Title is required';
  if (!formData.artworkDescription) errors.value.artworkDescription = 'Description is required';
  if (!formData.price || formData.price <= 0) errors.value.price = 'Valid price is required';
  if (!formData.artworkCategory) errors.value.artworkCategory = 'Category is required';
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  loading.value = true;
  errorMessage.value = '';
  try {
    await artworkService.create({
      ...formData,
      price: Number(formData.price),
      imageUrl: imagePreview.value
    });
    success('Artwork uploaded successfully!');
    if (props.embedded) {
      emit('uploaded');
    } else {
      router.push({ path: '/artistDashboard', query: { tab: 'my-art' } });
    }
  } catch (err) {
    errorMessage.value = err.message || 'Failed to upload artwork';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
.form-textarea { @apply w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all; }
.form-select { @apply w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all; }
.btn-primary { @apply inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg shadow-purple-500/20 transition-all; }
.btn-secondary { @apply inline-flex items-center px-6 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all; }
.alert-error { @apply p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm; }
</style>
