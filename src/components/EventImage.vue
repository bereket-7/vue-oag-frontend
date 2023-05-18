<template>
    <div>
      <h1>Event Image</h1>
      <img ref="eventImage" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'EventImage',
    data() {
      return {
        eventImage: null,
        error: null,
      };
    },
    mounted() {
      axios.get('http://localhost:8081/event/2').then((response) => {
        this.eventImage = response.data;
      }).catch((error) => {
        this.error = error;
      });
    },
    methods: {
      showEventImage() {
        if (this.eventImage) {
          const image = new Image();
          image.src = this.eventImage;
          image.style.width = '100px';
          image.style.height = '100px';
          this.$refs.eventImage.appendChild(image);
        } else {
          this.$refs.eventImage.innerHTML = this.error;
        }
      },
    },
  };
  </script>
  
  
  
  