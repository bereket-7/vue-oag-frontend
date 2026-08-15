<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
    <PageHeader
      title="Create competition"
      subtitle="Launch a new challenge for artists"
      eyebrow="Manager"
    />

    <form
      class="page-card p-6 sm:p-8 space-y-5"
      @submit.prevent="addCompetition"
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
        v-model="competition.title"
        label="Title"
        required
      />
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Description <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="competition.description"
          rows="4"
          class="form-textarea"
          required
        />
      </div>
      <BaseInput
        v-model="competition.numberOfCompetitor"
        type="number"
        label="Number of competitors"
        required
      />
      <BaseInput
        v-model="competition.expiryDate"
        type="date"
        label="Expiry date"
        required
      />

      <div class="flex flex-wrap gap-3">
        <button
          type="submit"
          class="kelem-btn"
          :disabled="loading"
        >
          Add competition
        </button>
        <router-link
          to="/manager/competitions"
          class="inline-flex items-center px-6 py-3 rounded-xl font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
        >
          Manage competitions
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { competitionService } from '@/services/competitionService';
import { BaseInput, PageHeader } from '@/components/common';

const competition = reactive({
  title: '',
  description: '',
  numberOfCompetitor: '',
  expiryDate: ''
});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const addCompetition = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await competitionService.create({ ...competition });
    successMessage.value = 'Competition created.';
    Object.assign(competition, {
      title: '',
      description: '',
      numberOfCompetitor: '',
      expiryDate: ''
    });
  } catch {
    errorMessage.value = 'Failed to add competition.';
  } finally {
    loading.value = false;
  }
};
</script>
