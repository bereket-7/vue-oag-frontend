<template>
  <div class="container">
    <h1>Add Competition</h1>
    <form @submit.prevent="addCompetition">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="title" v-model="competition.title" required>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea class="form-control" id="description" v-model="competition.description" required></textarea>
      </div>
      <div class="mb-3">
        <label for="numberOfCompetitor" class="form-label">Number of Competitor</label>
        <input type="number" class="form-control" id="numberOfCompetitor" v-model="competition.numberOfCompetitor" required>
      </div>
      <div class="mb-3">
        <label for="expiryDate" class="form-label">Expiry Date</label>
        <input  class="form-control" id="expiryDate" v-model="competition.expiryDate" required>
      </div>
      <button type="submit" class="btn btn-primary">Add Competition</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCompetition",
  data() {
    return {
      competition: {
        title: "",
        description: "",
        numberOfCompetitor: "",
        expiryDate: "",
      },
    };
  },
  methods: {
    async addCompetition() {
      try {
        await axios.post("http://localhost:8081/competition/add", this.competition);
        alert("Competition added successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to add competition.");
      }
    },
  },
};
</script>

  <style scoped>
/*
.container {
  display: flex;
  justify-content: center;
  align-items: center;
 /* Set the height of the container 
}

.form {
  width: 400px; /* Set the width of the form 
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Add a shadow effect 
}

/* Style the form fields 
.form input[type="text"],
.form input[type="email"],
.form textarea {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  background-color: #fff;
}

 Style the form submit button 
.form input[type="submit"] {
  background-color: #4CAF50;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

Add hover effects to the form submit button 
.form input[type="submit"]:hover {
  background-color: #45a049;
}
*/
  /* Add any custom CSS styles here */
  </style>
  