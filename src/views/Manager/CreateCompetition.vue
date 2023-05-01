<template>
  <div>
    <h1>Add Competition</h1>
    <form @submit.prevent="addCompetition">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="competition.competitionTitle" required><br><br>

      <label for="description">Description:</label>
      <input type="text" id="description" v-model="competition.competitionDescription" required><br><br>

      <label for="numberOfCompetitor">Number of Competitors:</label>
      <input type="number" id="numberOfCompetitor" v-model="competition.numberOfCompetitor" required><br><br>

      <label for="expiryDate">Expiry Date:</label>
      <input type="date" id="expiryDate" v-model="competition.expiryDate" required><br><br>

      <button type="submit">Add Competition</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCompetition',
  data() {
    return {
      competition: {
        competitionTitle: '',
        competitionDescription: '',
        numberOfCompetitor: '',
        expiryDate: ''
      }
    }
  },
  methods: {
    async addCompetition() {
      try {
        await axios.post('http://localhost:8081/competition/add', this.competition);
        alert('Competition added successfully!');
      } catch (error) {
        console.error(error);
        alert('Failed to add competition.');
      }
    }
  }
}
</script>
