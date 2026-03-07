<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Events</h2>

    <LoadingSpinner v-if="loading" size="lg" />

    <div v-else-if="events.length === 0" class="text-center py-12">
      <i class="fas fa-calendar-times text-6xl text-gray-300 mb-4"></i>
      <p class="text-gray-500">No events available</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
          <div class="absolute inset-0 flex items-center justify-center">
            <i class="fas fa-calendar-alt text-6xl text-white opacity-20"></i>
          </div>
          <div class="absolute top-4 right-4">
            <span class="px-3 py-1 bg-white text-blue-600 text-xs font-bold rounded-full">
              {{ event.status || 'Upcoming' }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ event.eventTitle }}</h3>
          <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ event.eventDescription }}</p>

          <div class="space-y-2 mb-4">
            <div class="flex items-center text-sm text-gray-600">
              <i class="fas fa-calendar w-5"></i>
              <span>{{ formatDate(event.eventDate) }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <i class="fas fa-clock w-5"></i>
              <span>{{ event.eventTime }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <i class="fas fa-map-marker-alt w-5"></i>
              <span>{{ event.location }}</span>
            </div>
          </div>

          <BaseButton variant="primary" size="sm" full-width @click="viewDetails(event)">
            View Details
          </BaseButton>
        </div>
      </div>
    </div>

    <BaseModal v-model="showDetailsModal" :title="selectedEvent?.eventTitle" size="lg">
      <div v-if="selectedEvent" class="space-y-4">
        <p class="text-gray-700">{{ selectedEvent.eventDescription }}</p>
        
        <div class="grid grid-cols-2 gap-4 py-4 border-t border-b">
          <div>
            <p class="text-sm text-gray-600">Date</p>
            <p class="font-semibold">{{ formatDate(selectedEvent.eventDate) }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Time</p>
            <p class="font-semibold">{{ selectedEvent.eventTime }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Location</p>
            <p class="font-semibold">{{ selectedEvent.location }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Organizer</p>
            <p class="font-semibold">{{ selectedEvent.organizerName }}</p>
          </div>
        </div>
      </div>

      <template #footer>
        <BaseButton variant="secondary" @click="showDetailsModal = false">Close</BaseButton>
        <BaseButton variant="primary" @click="registerForEvent">Register</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNotification } from '@/composables/useNotification';
import { BaseButton, BaseModal, LoadingSpinner } from '@/components/common';
import api from '@/services/api';

const { success, error: showError } = useNotification();

const events = ref([]);
const loading = ref(false);
const showDetailsModal = ref(false);
const selectedEvent = ref(null);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const fetchEvents = async () => {
  loading.value = true;
  try {
    const response = await api.get('/events');
    events.value = response.data;
  } catch (err) {
    showError('Failed to load events');
  } finally {
    loading.value = false;
  }
};

const viewDetails = (event) => {
  selectedEvent.value = event;
  showDetailsModal.value = true;
};

const registerForEvent = async () => {
  try {
    await api.post(`/events/${selectedEvent.value.id}/register`);
    success('Successfully registered for event!');
    showDetailsModal.value = false;
  } catch (err) {
    showError('Failed to register for event');
  }
};

onMounted(() => {
  fetchEvents();
});
</script>
