<template>
  <div class="event-list">
    <div v-for="event in events" :key="event.id" class="event-card">
      <h1 class="event-name">{{ event.eventName }}</h1>
      <p class="event-description">{{ event.eventDescription }}</p>
      <p class="event-description">{{ event.ticketPrice }}</p>
      <p class="event-description">{{ event.location }}</p>
      <p class="event-description">{{ event.capacity }}</p>
      <p class="event-description">{{ event.eventDate }}</p>
      <div class="image-container">
        <img :src="getEventImageUrl(event.id)" alt="Event Image" class="event-image" />
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
    // Fetch all events
    this.fetchAllEvents();
  },
  methods: {
    fetchAllEvents() {
      fetch('http://localhost:8081/event', {
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
  width: 300px;
  margin: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  text-align: center;
}

.event-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.event-description {
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  justify-content: center;
}

.event-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>

