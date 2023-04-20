<template>
    <div class="container">
      <h1>Submit a Report</h1>
      <form @submit.prevent="submitReport">
        <div class="form-group">
          <label for="reportTitle">Report Title</label>
          <input type="text" class="form-control" id="reportTitle" v-model="reportTitle">
        </div>
        <div class="form-group">
          <label for="reportDetail">Report Detail</label>
          <textarea class="form-control" id="reportDetail" v-model="reportDetail"></textarea>
        </div>
        <div class="form-group">
          <label for="reporterName">Reporter Name</label>
          <input type="text" class="form-control" id="reporterName" v-model="reporterName">
        </div>
        <div class="form-group">
          <label for="reporterEmail">Reporter Email</label>
          <input type="email" class="form-control" id="reporterEmail" v-model="reporterEmail">
        </div>
        <button type="submit" class="btn btn-primary">Submit Report</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reportTitle: '',
        reportDetail: '',
        reporterName: '',
        reporterEmail: '',
      };
    },
    methods: {
      async submitReport() {
        try {
          const response = await fetch('/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reportTitle: this.reportTitle,
              reportDetail: this.reportDetail,
              reporterName: this.reporterName,
              reporterEmail: this.reporterEmail,
            }),
          });
          if (response.ok) {
            alert('Report submitted successfully');
            this.reportTitle = '';
            this.reportDetail = '';
            this.reporterName = '';
            this.reporterEmail = '';
          } else {
            alert('Failed to submit report');
          }
        } catch (error) {
          console.error(error);
          alert('Failed to submit report');
        }
      },
    },
  };
  </script>
  