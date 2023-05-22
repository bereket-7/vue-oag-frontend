<template>
  <div class="form-container">
    <h1>Add Competition</h1>
    <form @submit.prevent="addCompetition" class="form">
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
      },
      success: false
    }
  },
  methods: {
    async addCompetition() {
      try {
        await axios.post('http://localhost:8081/competition/add', this.competition);
        alert("successfully registered");
        this.resetForm();
      } catch (error) {
        console.error(error);
        alert('Failed to add competition.');
      }
    },
    resetForm() {
      this.competition = {
        competitionTitle: '',
        competitionDescription: '',
        numberOfCompetitor: '',
        expiryDate: ''
      };
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
  max-width: 400px;
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

.success-message {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 255, 0, 0.5);
  font-size: 2em;
  font-weight: bold;
  z-index: 500;
}


.form-container {
  max-width: 600px;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  .form-container {
    max-width: 500px;
  }
}
@media screen and (max-width: 480px) {
  .form-container {
    max-width: 300px;
  }
}


input[type="text"], input[type="email"], input[type="tel"], input[type="password"], select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
}

input[type="submit"], button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type="submit"]:hover, button:hover {
  background-color: #3e8e41;
}


@media screen and (max-width: 480px) {
  input[type="text"], input[type="email"], input[type="tel"], input[type="password"], select {
    padding: 10px;
  }
  
  input[type="submit"], button {
    padding: 10px;
    font-size: 16px;
  }
}
</style>