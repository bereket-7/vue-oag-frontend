<template>
    <div>
      <img :src="imageUrl" alt="Event Image" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageUrl: null,
        eventName: null,
      };
    },
    mounted() {
      // Fetch event image
      this.fetchEventImage();
    },
    methods: {
      fetchEventImage() {
        const eventId = 2; // Replace with the actual event ID you want to fetch
  
        fetch(`http://localhost:8081/event/${eventId}`, {
          method: 'GET',
          headers: {
            Accept: 'image/png',
          },
        })
          .then(response => {
            // Check if the response was successful
            if (response.ok) {
              // Get the event name from response headers
              this.eventName = response.headers.get('x-event-name');
  
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
  
  
