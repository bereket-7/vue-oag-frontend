<template>
    <div class="container">
      <h1>Send Message</h1>
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="recipient">Recipient:</label>
          <input type="email" class="form-control" id="recipient" v-model="recipient" required>
        </div>
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input type="text" class="form-control" id="subject" v-model="subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea class="form-control" id="message" v-model="message" required></textarea>
        </div>
        <br>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
      <div v-if="status" class="alert alert-success mt-3" role="alert">{{ status }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        recipient: '',
        subject: '',
        message: '',
        status: ''
      }
    },
    methods: {
      sendEmail() {
        axios.post('http://localhost:8081/email/sendEmail', {
          recipient: this.recipient,
          subject: this.subject,
          message: this.message
        })
        .then(response => {
          this.status = response.data.message;
          this.recipient = '';
          this.subject = '';
          this.message = '';
        })
        .catch(error => {
          this.status = error.response.data.message;
        });
      }
    }
  }
  </script>
  
  <style scoped>
  
  .container {
  max-width: 600px; /* adjust the max-width to your preference */
  margin: auto; /* center the form horizontally */
}

.form-group {
  margin-bottom: 20px; /* spacing between each input field */
}
h1 {
  color: #4CAF50;
}
.form-group label {
  display: block; /* display the label text in a block */
  margin-bottom: 5px; /* spacing between the label and the input field */
  font-weight: bold; /* make the label text bold */
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
  width: 100%; /* make the input fields full width of their container */
  padding: 10px; /* add some padding for better readability */
  border: 1px solid #ccc; /* add a border to the input fields */
  border-radius: 5px; /* round the corners of the input fields */
  font-size: 16px; /* set the font size */
}

.form-group input[type="submit"] {
  background-color: #4CAF50; /* set the background color */
  color: white; /* set the text color */
  padding: 10px 20px; /* add padding to the submit button */
  border: none; /* remove the border */
  border-radius: 5px; /* round the corners */
  font-size: 16px; /* set the font size */
  cursor: pointer; /* add a pointer cursor on hover */
}

/* make the form responsive */
@media screen and (max-width: 600px) {
  .container {
    max-width: 100%; /* make the form full width on smaller screens */
  }
}

  </style>