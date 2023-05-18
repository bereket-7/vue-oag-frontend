<template>
    <div id="app">
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
        console.log("=============");
        this.eventImage = response.data;
        this.showEventImage();
      }).catch((error) => {
        this.error = error;
        console.log();
      });
    },
    methods: {
      showEventImage() {
        console.log(this.eventImage);
      var img = document.createElement("img");
      img.src = "data:image/png;base64," + this.eventImage;
      document.getElementById("app").appendChild(img);
      },
    },
  };
  </script>
  
  
  
  