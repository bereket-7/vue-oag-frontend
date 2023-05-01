<template>
  <div class="form-container">
    <h1>Add Competition</h1>
    <form @submit.prevent="addCompetition"   class="form">
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

<style scoped>
    .form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form input[type="text"],
.form input[type="email"],
.form input[type="password"],
.form input[type="date"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f8f8f8;
}

.form input[type="text"]:hover,
.form input[type="email"]:hover,
.form input[type="password"]:hover,
.form input[type="date"]:hover {
  background-color: #e8e8e8;
}

.form button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  margin: 8px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form button:hover {
  background-color: #3e8e41;
}

.form button[type="reset"] {
  background-color: #f44336;
}

.form button[type="reset"]:hover {
  background-color: #d32f2f;
}

</style>