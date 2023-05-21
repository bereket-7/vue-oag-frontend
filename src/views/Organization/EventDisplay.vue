
<template>
  <div class="event-list">
    <div v-for="event in events" :key="event.id" class="event-card">
      <div class="event-image-container">
        <img :src="getEventImageUrl(event.id)" alt="Event Image" class="event-image" />
      </div>
      <div class="event-details">
        <h1 class="event-name">{{ event.eventName }}</h1>
        <p class="event-description">{{ event.eventDescription }}</p>
        <p class="event-description">Ticket Price: {{ event.ticketPrice }}</p>
        <p class="event-description">Location: {{ event.location }}</p>
        <p class="event-description">Capacity: {{ event.capacity }}</p>
        <p class="event-description">Event Date: {{ event.eventDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.fetchAllEvents();
  },
  methods: {
    fetchAllEvents() {
      fetch('http://localhost:8081/events', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch events');
          }
        })
        .then(data => {
          this.events = data;
          this.fetchEventImages();
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchEventImages() {
      this.events.forEach(event => {
        fetch(`http://localhost:8081/event/${event.id}/image`, {
          method: 'GET',
          headers: {
            Accept: 'image/png',
          },
        })
          .then(response => {
            if (response.ok) {
              return response.blob();
            } else {
              throw new Error(`Failed to fetch image for event ${event.id}`);
            }
          })
          .then(imageBlob => {
            event.imageUrl = URL.createObjectURL(imageBlob);
          })
          .catch(error => {
            console.error(error);
          });
      });
    },
    getEventImageUrl(eventId) {
      const event = this.events.find(event => event.id === eventId);
      return event ? event.imageUrl : null;
    },
  },
};
</script>

<style scoped>
.event-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.event-card {
  width: 500px;
  margin: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.event-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1.2); 
}

.event-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 5px;
}

.event-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.event-details {
  margin-top: 10px;
}

.event-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.event-description {
  margin-bottom: 5px;
}

@media (max-width: 768px) {
  .event-card {
    width: 100%;
  }
}
</style>

