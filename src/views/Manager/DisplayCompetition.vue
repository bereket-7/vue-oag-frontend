<template>
    <div class="competition">
      <h2>Most Recent Competition</h2>
      <div v-if="competition" class="competition-card">
        <h3>{{ competition.competitionTitle }}</h3>
        <p>{{ competition.competitionDescription }}</p>
        <p>Number of Competitors: {{ competition.numberOfCompetitor }}</p>
        <p>Expiry Date: {{ competition.expiryDate }}</p>
        <router-link to="/registerCompetitor">  <button class="apply-button">Apply</button></router-link>
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
        competition: {
        competitionTitle: 'Sample Competition',
        competitionDescription: 'This is a sample competition description.',
        numberOfCompetitor: 10,
        expiryDate: '2023-07-01'
      }
       // competition: null
      };
    },
    mounted() {
      axios.get('http://localhost:8082/api/competition/most-recent')
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
.competition {
  text-align: center;
  margin-top: 100px;
}

.competition-card {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.competition-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.competition-card h3 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

.competition-card p {
  color: #666;
  font-size: 16px;
  margin-bottom: 8px;
}

.apply-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.apply-button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .competition-card {
    max-width: 90%;
    padding: 10px;
  }

  .competition-card h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .competition-card p {
    font-size: 14px;
    margin-bottom: 6px;
  }

  .apply-button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
  