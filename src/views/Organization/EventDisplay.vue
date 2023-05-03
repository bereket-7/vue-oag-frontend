<template>
  <div class="event-list">
    <div class="card-deck">
      <div v-for="event in events" :key="event.id" class="card mb-3">
        <img :src="event.eventPhoto" class="card-img-top" alt="Event Photo">
        <div class="card-body">
          <h5 class="card-title">{{ event.eventName }}</h5>
          <p class="card-text">{{ event.eventDescription }}</p>
          <p class="card-text"><small class="text-muted">{{ event.eventDate }}</small></p>
        </div>
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
        const response = await axios.get('http://localhost:8081/event/pending');
        this.events = response.data;
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the events.');
      }
    }
  }
}
</script>

<style scoped>
.event-list {
  padding: 20px;
}

.card-deck {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
}

.card {
  flex: 0 0 calc(33.333333% - 30px);
  margin: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>
