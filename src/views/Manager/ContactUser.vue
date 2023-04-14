<template>
    <div class="container">
      <h1>Contact Us</h1>
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
        <button type="submit" class="btn btn-primary">Send</button>
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
  