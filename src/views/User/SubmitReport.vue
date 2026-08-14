<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-14 px-4">
      <div class="relative max-w-2xl mx-auto text-center text-white">
        <p class="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
          Support
        </p>
        <h1 class="text-4xl font-bold mb-3">
          Submit a report
        </h1>
        <p class="text-white/80">
          Tell us about a problem with an artwork, user, or your account.
        </p>
      </div>
    </div>

    <div class="max-w-xl mx-auto px-4 py-10 -mt-8">
      <form
        class="page-card p-8 space-y-5"
        @submit.prevent="submitReport"
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
          v-model="reporter.reportTitle"
          label="Report title"
          placeholder="Brief summary"
          required
        />
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Details <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="reporter.reportDetail"
            rows="4"
            class="form-textarea"
            required
          />
        </div>
        <BaseInput
          v-model="reporter.reporterName"
          label="Your name"
          required
        />
        <BaseInput
          v-model="reporter.reporterEmail"
          type="email"
          label="Your email"
          required
        />
        <button
          type="submit"
          class="kelem-btn w-full"
          :disabled="loading"
        >
          <i
            v-if="loading"
            class="fas fa-spinner fa-spin mr-2"
          />
          Submit report
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { reportService } from '@/services/reportService';
import { BaseInput } from '@/components/common';

const reporter = reactive({
  reportTitle: '',
  reportDetail: '',
  reporterName: '',
  reporterEmail: ''
});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const submitReport = async () => {
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await reportService.create({ ...reporter });
    successMessage.value = 'Report submitted successfully.';
    Object.assign(reporter, {
      reportTitle: '',
      reportDetail: '',
      reporterName: '',
      reporterEmail: ''
    });
  } catch {
    errorMessage.value = 'Error submitting report.';
  } finally {
    loading.value = false;
  }
};
</script>
