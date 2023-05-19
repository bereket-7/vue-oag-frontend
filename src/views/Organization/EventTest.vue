<template>
  <div>
    <img :src="imageUrl" alt="Event Image" />
    <h2>{{ eventName }}</h2>
    <p>{{ location }}</p>
    <p>{{ eventDescription }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      eventName: null,
      location: null,
      eventDescription: null,
    };
  },
  mounted() {
    // Fetch event details
    this.fetchEventDetails();
  },
  methods: {
    fetchEventDetails() {
      const eventId = 2; // Replace with the actual event ID you want to fetch
      fetch(`http://localhost:8081/event/events/${eventId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        
        },
      })
        .then(response => {
          // Check if the response was successful
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch event details');
          }
        })
        .then(event => {
          // Update the data properties with the received event details
          this.eventName = event.eventName;
          this.location = event.location;
          this.eventDescription = event.eventDescription;
          
          // Convert the byte array to an image URL
          const imageBlob = new Blob([event.image], { type: 'image/png' });
          this.imageUrl = URL.createObjectURL(imageBlob);
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>
