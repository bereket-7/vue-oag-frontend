<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
    <PageHeader
      title="Create event"
      subtitle="Submit a gallery event for manager review"
      eyebrow="Organization"
    />

    <form
      class="page-card p-6 sm:p-8 space-y-5"
      @submit.prevent="saveEvent"
    >
      <div
        v-if="showSuccess"
        class="alert-success"
      >
        <i class="fas fa-check-circle mr-2" />Event created successfully.
      </div>
      <div
        v-if="errorMessage"
        class="alert-error"
      >
        <i class="fas fa-exclamation-circle mr-2" />{{ errorMessage }}
      </div>

      <BaseInput
        v-model="eventName"
        label="Event name"
        placeholder="Enter event title"
        required
      />
      <BaseInput
        v-model="ticketPrice"
        type="number"
        label="Ticket price"
      />
      <BaseInput
        v-model="capacity"
        type="number"
        label="Capacity"
      />
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Description <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="eventDescription"
          rows="4"
          class="form-textarea"
          required
        />
      </div>
      <BaseInput
        v-model="location"
        label="Location"
        required
      />
      <BaseInput
        v-model="eventDate"
        type="date"
        label="Event date"
        required
      />
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Image</label>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-50 dark:file:bg-purple-900/30 file:text-purple-700 dark:file:text-purple-300"
        >
      </div>
      <button
        type="submit"
        class="kelem-btn"
        :disabled="loading"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { eventService } from '@/services/eventService';
import { BaseInput, PageHeader } from '@/components/common';

const eventName = ref('');
const ticketPrice = ref(0);
const capacity = ref(0);
const eventDescription = ref('');
const location = ref('');
const eventDate = ref('');
const fileInput = ref(null);
const showSuccess = ref(false);
const errorMessage = ref('');
const loading = ref(false);

const saveEvent = async () => {
  loading.value = true;
  showSuccess.value = false;
  errorMessage.value = '';
  const formData = new FormData();
  formData.append('eventName', eventName.value);
  formData.append('ticketPrice', ticketPrice.value);
  formData.append('capacity', capacity.value);
  formData.append('eventDescription', eventDescription.value);
  formData.append('location', location.value);
  formData.append('eventDate', eventDate.value);
  const file = fileInput.value?.files?.[0];
  if (file) formData.append('image', file);
  try {
    await eventService.create(formData);
    showSuccess.value = true;
  } catch {
    errorMessage.value = 'An error occurred while creating the event.';
  } finally {
    loading.value = false;
  }
};
</script>
