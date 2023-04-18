<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-5 col-lg-4">
        <div class="card border-0 shadow-sm rounded-lg">
          <div class="card-header bg-success text-white text-center py-3">
            <h4 class="mb-0">Kelem Online Art</h4>
          </div>
          <div class="card-body">
            <form>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password">
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
            </form>
          </div>
          <div class="card-footer text-muted text-center">
            <a href="#" class="text-decoration-none">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterView/>
</template>
<script>
import FooterView from '@/components/FooterView.vue'
export default {
  name:'UserLogin',
  components: {
    FooterView
  },
  data() {
    
    return {
      username: '',
      password: '',
    }
  },
}
</script>

<style scoped>
.container {
  background-color:ghostwhite;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(7px);
}
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}

.btn-primary:focus {
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
}
@media only screen and (max-width: 768px) {
  form {
    max-width: 80%;
  }
}
</style>