<template>
  <div class="event-list">
    <div class="event-card" v-for="event in events" :key="event.id">
      <div class="event-card-column">
        <img :src="'/img/event-images/' + event.eventPhoto" :alt="event.eventName">
      </div>
      <div class="event-card-column">
        <h3>{{ event.eventName }}</h3>
        <p>{{ event.eventDescription }}</p>
        <p>{{ event.eventDate }}</p>
        <p>{{ event.location }}</p>
        <p>Capacity: {{ event.capacity }}</p>
        <p>Ticket Price: {{ event.ticketPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EventList',
  data() {
    return {
      events: []
    }
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get('http://localhost:8081/event/all');
        this.events = response.data;
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the events.');
      }
    }
  }
}
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
