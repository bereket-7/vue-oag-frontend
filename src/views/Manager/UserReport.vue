<template>
    <div class="container">
      <h1>Reports</h1>
      <div class="row">
        <div class="col-md-3" v-for="report in reports" :key="report.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ report.reportTitle }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ report.reporterName }} - {{ report.reporterEmail }}</h6>
              <p class="card-text">{{ report.reportDetail }}</p>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="selectedReports" :value="report.id">
                <label class="form-check-label">Select</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reports: [
          { id: 1, reportTitle: 'Report 1', reportDetail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', reporterName: 'John Doe', reporterEmail: 'john@example.com' },
          { id: 2, reportTitle: 'Report 2', reportDetail: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.', reporterName: 'Jane Smith', reporterEmail: 'jane@example.com' },
          { id: 3, reportTitle: 'Report 3', reportDetail: 'Donec interdum tellus at magna commodo cursus.', reporterName: 'Bob Johnson', reporterEmail: 'bob@example.com' },
          { id: 4, reportTitle: 'Report 4', reportDetail: 'Nulla eu velit eget ex hendrerit efficitur.', reporterName: 'Mary Williams', reporterEmail: 'mary@example.com' },
          { id: 5, reportTitle: 'Report 5', reportDetail: 'Fusce eget lectus ut massa vehicula porttitor at a massa.', reporterName: 'Tom Brown', reporterEmail: 'tom@example.com' }
        ],
        selectedReports: []
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

.card {
  margin-bottom: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.card-subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 20px;
}

.card-text {
  font-size: 1rem;
  line-height: 1.5;
}

.form-check {
  margin-top: 20px;
}

.form-check-input {
  margin-right: 10px;
}

@media (min-width: 768px) {
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-body {
    flex-grow: 1;
  }

  .row-cols-md-4 {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .col-md-4 {
    flex-basis: 25%;
    max-width: 25%;
    padding: 0 15px;
  }
}

</style> 