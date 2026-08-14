<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
    <PageHeader
      title="Update event"
      subtitle="Change details for an existing organization event"
      eyebrow="Organization"
    />

    <form
      class="page-card p-6 sm:p-8 space-y-5"
      @submit.prevent="updateEvent"
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
        v-model="updatedEvent.eventName"
        label="Event name"
        required
      />
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
        <textarea
          v-model="updatedEvent.eventDescription"
          rows="4"
          class="form-textarea"
        />
      </div>
      <BaseInput
        v-model="updatedEvent.location"
        label="Location"
        required
      />
      <BaseInput
        v-model="updatedEvent.ticketPrice"
        type="number"
        label="Ticket price"
      />
      <BaseInput
        v-model="updatedEvent.capacity"
        type="number"
        label="Capacity"
      />
      <BaseInput
        v-model="updatedEvent.eventDate"
        type="date"
        label="Event date"
        required
      />
      <button
        type="submit"
        class="kelem-btn"
        :disabled="loading"
      >
        Update event
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { eventService } from '@/services/eventService';
import { BaseInput, PageHeader } from '@/components/common';

const route = useRoute();
const updatedEvent = reactive({
  eventName: '',
  eventDescription: '',
  ticketPrice: 0,
  capacity: 0,
  location: '',
  eventDate: ''
});
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

const updateEvent = async () => {
  const eventId = route.query.id;
  if (!eventId) {
    errorMessage.value = 'Missing event id.';
    return;
  }
  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';
  try {
    await eventService.update(eventId, { ...updatedEvent });
    successMessage.value = 'Event updated successfully.';
  } catch {
    errorMessage.value = 'Error updating event.';
  } finally {
    loading.value = false;
  }
};
</script>
