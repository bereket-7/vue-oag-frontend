<template>
  <div>
    <div v-for="event in events" :key="event.id">
      <h1>{{ event.eventName }}</h1>
      <p>{{ event.eventDescription }}</p>
      <img :src="getEventImageUrl(event.id)" alt="Event Image" />
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
          // Check if the response was successful
          if (response.ok) {
            // Parse the response body as JSON
            return response.json();
          } else {
            throw new Error('Failed to fetch events');
          }
        })
        .then(data => {
          // Set the events array
          this.events = data;

          // Fetch the images for each event
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
            // Check if the response was successful
            if (response.ok) {
              // Convert the response to blob
              return response.blob();
            } else {
              throw new Error(`Failed to fetch image for event ${event.id}`);
            }
          })
          .then(imageBlob => {
            // Create a URL for the blob object
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


