<template>
    <div>
      <img :src="eventDetails.image" alt="Event Image" />
      <h2>{{ eventDetails.eventName }}</h2>
      <p>{{ eventDetails.location }}</p>
      <p>{{ eventDetails.eventDescription }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        eventDetails: {},
      };
    },
    mounted() {
      // Fetch event details
      this.fetchEventDetails();
    },
    methods: {
      fetchEventDetails() {
        const eventId = 2; // Replace with the actual event ID you want to fetch
        fetch(`http://localhost:8081/event/${eventId}`, {
          method: 'GET',
        })
          .then(response => {
            // Check if the response was successful
            if (response.ok) {
              // Parse the response as JSON
              return response.json();
            } else {
              throw new Error('Failed to fetch event details');
            }
          })
          .then(data => {
            // Store the event details in the component data
            this.eventDetails = data;
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  