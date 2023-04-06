<template>
      <form class="vh-200">
        <div class="container h-150">
        <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-9">
          <h1 class="text-primary mb-4">Create Competition</h1>

        <div class="card">
          <div class="card-body bg-light">
 
        <div class="input-group flex-nowrap pt-4 pb-3">
          <span class="input-group-text" for="competitionTitle" id="competitionTitle">Competition   
             Title</span>
        <input type="text" class="form-control form-control-lg" placeholder="water color painting competition" 
         id="competitionTitle" 
         v-model="competitionTitle" aria-label="Competition Title" aria-describedby="addon-wrapping">
        </div>

        <div class="input-group flex-nowrap py-3">
          <span class="input-group-text" for="competitionDescription">Competition Description</span>
          <textarea type="text" class="form-control form-control-lg" id="competitionDescription" rows="3" 
          v-model="competitionDescription"></textarea>
        </div>


        <div class="input-group flex-nowrap pt-3">
          <span class="input-group-text" for="numberOfCompetitor">Number of Competitors</span>
          <input type="number" min='3' class="form-control form-control-lg" id="numberOfCompetitor" 
          v-model.number="numberOfCompetitor">
        </div>

        <div class="input-group flex-nowrap pt-3">
          <span class="input-group-text" for="expiryDate">Date</span>
          <input type="date" class="form-control form-control-lg" id="createDate" v-model="createDate">
        </div>
        <hr class="mx-n3">
        <div class="px-5 py-4">   
        <button type="submit" class="btn btn-primary btn-lg" @click.prevent="registerCompetition()">Create</button>
        </div>
        </div>
</div>
</div>
</div>
</div>

      </form>
  </template>
  
  <script>
  export default {
    name:'CreateCompetition',
    data() {
      return {
        competitionTitle: '',
        competitionDescription: '',
        numberOfCompetitor: 0,
        createDate: ''
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
  