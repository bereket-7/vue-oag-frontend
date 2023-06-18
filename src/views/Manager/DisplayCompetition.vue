<template>
    <div class="competition">
      <h2>Most Recent Competition</h2>
      <div v-if="competition">
        <h3>{{ competition.competitionTitle }}</h3>
        <p>{{ competition.competitionDescription }}</p>
        <p>Number of Competitors: {{ competition.numberOfCompetitor }}</p>
        <p>Expiry Date: {{ competition.expiryDate }}</p>
      </div>
      <div v-else>
        <p>No competition found.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DisplayCompetition',
    data() {
      return {
        competition: null
      };
    },
    mounted() {
      axios.get('/most-recent')
        .then(response => {
          this.competition = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  };
  </script>
  
  <style scoped>
  </style>
  