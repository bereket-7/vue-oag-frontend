<template>
    <div class="container mt-5">
      <h1>Register for the competition</h1>
      <form>
        <div class="form-group">
          <label for="competitionTitle">Competition Title:</label>
          <input type="text" class="form-control" id="competitionTitle" v-model="competitionTitle">
        </div>
        <div class="form-group">
          <label for="competitionDescription">Competition Description:</label>
          <textarea class="form-control" id="competitionDescription" rows="3" v-model="competitionDescription"></textarea>
        </div>
        <div class="form-group">
          <label for="numberOfCompetitor">Number of Competitors:</label>
          <input type="number" class="form-control" id="numberOfCompetitor" v-model.number="numberOfCompetitor">
        </div>
        <div class="form-group">
          <label for="expiryDate">Expiry Date:</label>
          <input type="date" class="form-control" id="expiryDate" v-model="expiryDate">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="registerCompetition()">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        competitionTitle: '',
        competitionDescription: '',
        numberOfCompetitor: 0,
        expiryDate: ''
      }
    },
    methods: {
      registerCompetition() {
        // Submit the form data to the server or perform any other necessary action.
        console.log({
          competitionTitle: this.competitionTitle,
          competitionDescription: this.competitionDescription,
          numberOfCompetitor: this.numberOfCompetitor,
          expiryDate: this.expiryDate
        })
      }
    }
  }
  </script>
  
  <style>
  /* Add any custom CSS styles here */
  </style>
  