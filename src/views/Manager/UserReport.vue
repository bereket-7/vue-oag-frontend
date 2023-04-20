<template>
    <div class="container">
      <h1>User Reports</h1>
      <div class="col">
        <div class="col-md-3" v-for="report in reports" :key="report.id">
          <div class="card">
            <div class="card-body">
              <h1 class="card-title">{{ report.reportTitle }}</h1>
              <h6 class="card-subtitle mb-2 text-muted">{{ report.reporterName }} - {{ report.reporterEmail }}</h6>
              <p class="card-text">{{ report.reportDetail }}</p>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="selectedReports" :value="report.id">
                <label class="form-check-label">Check</label>
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
          { id: 1, reportTitle: 'Plagarism', reportDetail: 'the artwork uploaded by name was From the internet source and i provided the link below .', reporterName: 'Beneyam Legese', reporterEmail: 'benjamen@gmail.com' },
          { id: 2, reportTitle: 'Artwork not display', reportDetail: 'My artwork is not uploaded i submitted for approval in last month', reporterName: 'Bereket Getachew', reporterEmail: 'benjamen@gmail.com' },
          { id: 3, reportTitle: 'Plagarism', reportDetail: 'the artwork uploaded by name was From the internet source and i provided the link below .', reporterName: 'Beneyam Legese', reporterEmail: 'benjamen@gmail.com' },
          { id: 4, reportTitle: 'Artwork not display', reportDetail: 'My artwork is not uploaded i submitted for approval in last month', reporterName: 'Bereket Getachew', reporterEmail: 'benjamen@gmail.com' },
          { id: 5, reportTitle: 'Accounted blocked', reportDetail: 'My account is disabled without any reason,username:bereketgetachew', reporterName: 'Bereket getachew', reporterEmail: 'beki@example.com' }
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
  text-align: left;
  margin-bottom: 30px;
  margin-top: 20px;
}

.card {
  margin-bottom: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 400px;
}

.card-body {
  padding: 20px;
  
}
.card:hover {
	transform: scale(1.1);
    background-color:mintcream;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #f70606;
}

.card-subtitle {
  font-size: 1.3rem;
  color: #020b13;
  margin-bottom: 20px;
}

.card-text {
  font-size: 1.1rem;
  line-height: 1.5;
}

.form-check {
  margin-top: 20px;
}

.form-check-input {
  margin-left: 15px;
}

@media (min-width: 768px) {
  .card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color:rgb(250, 250, 250);
  }

  .card-body {
    flex-grow: 1;
  }

  .row-cols-md-3 {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
  }

  .col-md-3 {
    flex-basis: 25%;
    max-width: 25%;
    padding: 0 15px;
  }
}

</style> 