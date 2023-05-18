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
        const eventId = 3; // Replace with the actual event ID you want to fetch
        fetch(`http://localhost:8081/event/${eventId}`, {
          method: 'GET',
          headers: {
            Accept: 'image/png',
          },
        })
          .then(response => {
            // Check if the response was successful
            if (response.ok) {
              // Get the event details from response headers
              this.eventName = response.headers.get('x-event-name');
              this.location = response.headers.get('x-location');
              this.eventDescription = response.headers.get('x-event-description');
    
              // Convert the response to blob
              return response.blob();
            } else {
              throw new Error('Failed to fetch event image');
            }
          })
          .then(imageBlob => {
            // Create a URL for the blob object
            this.imageUrl = URL.createObjectURL(imageBlob);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  