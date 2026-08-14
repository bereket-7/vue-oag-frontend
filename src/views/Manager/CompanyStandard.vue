<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
    <PageHeader
      title="Company standards"
      subtitle="Publish a policy that artists and customers can read"
      eyebrow="Manager"
    />

    <form
      class="page-card p-6 sm:p-8 space-y-5"
      @submit.prevent="saveStandard"
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

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Standard description <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="standardDescription"
          rows="4"
          class="form-textarea"
          required
        />
      </div>

      <div>
        <label
          for="standardType"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
        >Standard type</label>
        <select
          id="standardType"
          v-model="standardType"
          class="input"
          required
        >
          <option value="organizational">
            Organizational
          </option>
          <option value="artwork">
            Artwork
          </option>
          <option value="customer">
            Customer
          </option>
        </select>
      </div>

      <p class="text-sm text-gray-500 dark:text-gray-400">
        This will appear in the public
        <router-link
          to="/displayStandard"
          class="text-purple-600 dark:text-purple-400 font-medium"
        >policy &amp; standards</router-link>
        list.
      </p>

      <button
        type="submit"
        class="kelem-btn"
        :disabled="loading"
      >
        <i
          v-if="loading"
          class="fas fa-spinner fa-spin mr-2"
        />
        Submit standard
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { standardService } from '@/services/standardService';
import { PageHeader } from '@/components/common';

const standardDescription = ref('');
const standardType = ref('organizational');
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const saveStandard = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await standardService.create({
      standardDescription: standardDescription.value,
      standardType: standardType.value
    });
    successMessage.value = 'Standard uploaded successfully.';
    standardDescription.value = '';
    standardType.value = 'organizational';
  } catch {
    errorMessage.value = 'An error occurred while uploading.';
  } finally {
    loading.value = false;
  }
};
</script>
