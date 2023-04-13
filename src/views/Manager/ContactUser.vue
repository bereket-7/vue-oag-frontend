<template>
    <div>
      <form @submit.prevent="sendEmail">
        <div class="form-group">
          <label for="recipient">Recipient</label>
          <input type="text" id="recipient" v-model="recipient" required>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" v-model="subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="message" rows="4" required></textarea>
        </div>
        <div class="form-group">
          <label for="attachment">Attachment</label>
          <input type="file" id="attachment" @change="onFileSelected">
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:'ContactUser',
    data() {
      return {
        recipient: '',
        subject: '',
        message: '',
        attachment: null,
      };
    },
    methods: {
      onFileSelected(event) {
        this.attachment = event.target.files[0];
      },
      async sendEmail() {
        const formData = new FormData();
        formData.append('recipient', this.recipient);
        formData.append('subject', this.subject);
        formData.append('message', this.message);
        if (this.attachment) {
          formData.append('attachment', this.attachment);
        }
  
        try {
          const response = await axios.post('http://localhost:8081/email/sendEmail', formData);
          console.log(response.data);
          // TODO: show success message to user
        } catch (error) {
          console.error(error);
          // TODO: show error message to user
        }
      },
    },
  };
  </script>
  