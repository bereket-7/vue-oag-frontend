<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Login</h1>
        <div class="card">
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="username" type="text" class="form-control" id="username" required>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" required>
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'OrganizationLogin',
  components: {
   
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      // Implement your login logic here using axios or fetch
    }
  }
}
</script>

<style scoped>
.container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
.card {
  border: none;
  border-radius: 1rem;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  background-color: #fff;
  max-width: 600px;
  width: 400px;
}
.card-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-control {
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1.1rem;
  border: 1px solid #ced4da;
}
.form-control:focus {
  border-color: #36b9cc;
  box-shadow: 0 0 0 0.25rem rgba(54, 185, 204, 0.25);
}
.btn-primary {
  background-color: #36b9cc;
  border-color: #36b9cc;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: bold;
  width: 100%;
}
.btn-primary:hover {
  background-color: #2a96a5;
  border-color: #2a96a5;
}
</style>
