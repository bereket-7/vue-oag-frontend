<template>
  <div class="event-list">
    <div class="event-card" v-for="event in events" :key="event.id">
      <div class="event-card-column">
        <img :src="'/img/event-images/' + event.eventPhoto" :alt="event.eventName">
      </div>
      <div class="event-card-column">
        <h3>{{ event.eventName }}</h3>
        <p>{{ event.eventDescription }}</p>
        <p>Date: {{ event.eventDate }}</p>
        <p>Location: {{ event.location }}</p>
        <p>{{ event.location }}</p>
        <p>Capacity: {{ event.capacity }}</p>
        <p>Ticket Price: {{ event.ticketPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, onMounted } from 'vue';

export default {
  setup() {
    const events = ref([]);
    const loading = ref(true);

    // Fetching events from API
    const fetchEvents = async () => {
      try {
        const response = await fetch('/http://localhost:8081/event/all');
        const data = await response.json();
        events.value = data;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchEvents();
    });

    return { events, loading };
  },
};
</script>


<style>
.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.event-card {
  margin: 1rem;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
}

.event-card-column {
  flex: 1;
  margin-right: 1rem;
}

@media screen and (max-width: 767px) {
  .event-card {
    flex-direction: column;
  }
}
</style>
