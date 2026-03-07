<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Upload Artwork</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6 space-y-6">
          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Artwork Image <span class="text-red-500">*</span>
            </label>
            
            <div
              @drop.prevent="handleDrop"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              :class="[
                'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              ]"
            >
              <div v-if="!imagePreview">
                <i class="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-600 mb-2">Drag and drop your image here, or</p>
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileSelect"
                  class="hidden"
                />
                <BaseButton type="button" variant="outline" @click="$refs.fileInput.click()">
                  Browse Files
                </BaseButton>
                <p class="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
              </div>
              
              <div v-else class="relative">
                <img :src="imagePreview" alt="Preview" class="max-h-64 mx-auto rounded-lg" />
                <button
                  type="button"
                  @click="removeImage"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <p v-if="errors.image" class="mt-1 text-sm text-red-600">{{ errors.image }}</p>
          </div>

          <!-- Artwork Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput
              v-model="formData.artworkName"
              label="Artwork Title"
              placeholder="Enter artwork title"
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="formData.artworkDescription"
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Describe your artwork..."
              required
            ></textarea>
            <p v-if="errors.artworkDescription" class="mt-1 text-sm text-red-600">
              {{ errors.artworkDescription }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Category <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.artworkCategory"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select category</option>
                <option value="Painting">Painting</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Photography">Photography</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Mixed Media">Mixed Media</option>
              </select>
            </div>

            <BaseInput
              v-model="formData.size"
              label="Size"
              placeholder="e.g., 24x36 inches"
            />
          </div>

          <BaseInput
            v-model="formData.medium"
            label="Medium"
            placeholder="e.g., Oil on canvas"
          />

          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ errorMessage }}
          </div>

          <div class="flex gap-3">
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="loading"
              full-width
            >
              Upload Artwork
            </BaseButton>
            <BaseButton
              type="button"
              variant="secondary"
              size="lg"
              @click="$router.back()"
            >
              Cancel
            </BaseButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useArtworkStore } from '@/stores/artwork';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, BaseButton } from '@/components/common';

const router = useRouter();
const artworkStore = useArtworkStore();
const { success, error: showError } = useNotification();

const fileInput = ref(null);
const imageFile = ref(null);
const imagePreview = ref(null);
const isDragging = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const errors = ref({});

const formData = reactive({
  artworkName: '',
  artworkDescription: '',
  price: '',
  artworkCategory: '',
  size: '',
  medium: ''
});

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) processFile(file);
};

const handleDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    processFile(file);
  }
};

const processFile = (file) => {
  if (file.size > 10 * 1024 * 1024) {
    errors.value.image = 'File size must be less than 10MB';
    return;
  }
  
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
  };
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
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  errorMessage.value = '';

  try {
    const formDataToSend = new FormData();
    formDataToSend.append('image', imageFile.value);
    formDataToSend.append('artworkName', formData.artworkName);
    formDataToSend.append('artworkDescription', formData.artworkDescription);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('artworkCategory', formData.artworkCategory);
    if (formData.size) formDataToSend.append('size', formData.size);
    if (formData.medium) formDataToSend.append('medium', formData.medium);

    await artworkStore.createArtwork(formDataToSend);
    success('Artwork uploaded successfully!');
    router.push('/artistDashboard');
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Failed to upload artwork';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>
