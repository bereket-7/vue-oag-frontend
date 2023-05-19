<template>
  <div>
    <h1>{{ eventName }}</h1>
    <p>{{ eventDescription }}</p>
    <img :src="imageUrl" alt="Event Image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      eventName: null,
      eventDescription: null,
    };
  },
  mounted() {
    // Fetch event details and image
    this.fetchEventDetails();
  },
  methods: {
    fetchEventDetails() {
      const eventId = 2;

      fetch(`http://localhost:8081/event/${eventId}`, {
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
            throw new Error('Failed to fetch event details');
          }
        })
        .then(data => {
          // Set event details from the parsed JSON data
          this.eventName = data.eventName;
          this.eventDescription = data.eventDescription;

          // Fetch the event image
          this.fetchEventImage();
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchEventImage() {
      const eventId = 2;

      fetch(`http://localhost:8081/event/${eventId}/image`, {
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
