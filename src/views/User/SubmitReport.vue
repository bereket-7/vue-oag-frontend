<template>
    <div class="container">
      <h1>Submit Report</h1>
      <form @submit.prevent="submitReport">
        <div class="form-group">
          <label for="reportTitle">Report Title</label>
          <input type="text" class="form-control" id="reportTitle" v-model="reporter.reportTitle" required>
        </div>
        <div class="form-group">
          <label for="reportDetail">Report Detail</label>
          <textarea class="form-control" id="reportDetail" v-model="reporter.reportDetail" rows="5" required></textarea>
        </div>
        <div class="form-group">
          <label for="reporterName">Reporter Name</label>
          <input type="text" class="form-control" id="reporterName" v-model="reporter.reporterName" required>
        </div>
        <div class="form-group">
          <label for="reporterEmail">Reporter Email</label>
          <input type="email" class="form-control" id="reporterEmail" v-model="reporter.reporterEmail" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        reporter: {
          reportTitle: '',
          reportDetail: '',
          reporterName: '',
          reporterEmail: ''
        }
      }
    },
    methods: {
      submitReport() {
        axios.post('/api/reporter/submit', this.reporter)
          .then(response => {
            console.log(response.data);
            alert('Report submitted successfully');
          })
          .catch(error => {
            console.log(error);
            alert('Error submitting report');
          });
      }
    }
  }
  </script>

  <style scoped>
    
    .container {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

form {
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

textarea {
  resize: vertical;
}

button[type="submit"] {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0069d9;
}
  
  </style>
  