<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <h1 class="text-center mb-4">Login</h1>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" v-model="username" :class="{'is-invalid': validationError}" />
              <div class="invalid-feedback" v-if="validationError">
                {{ validationError }}
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" :class="{'is-invalid': validationError}" />
              <div class="invalid-feedback" v-if="validationError">
                {{ validationError }}
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block mt-4">Login</button>
          </form>
        </div>
      </div>
    </div>
    <FooterView/>
  </template>
  
  <script>
  import FooterView from '@/components/FooterView.vue'
  import { defineComponent } from 'vue';

  import axios from 'axios';
  
  export default defineComponent({
    name: 'LoginPage',
    components:{
      FooterView
    },
    data() {
      return {
        username: '',
        password: '',
        validationError: '',
      };
    },
    methods: {
      async login() {
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.post('http://localhost:8081//login', {
            username: this.username,
            password: this.password,
          });
          // handle successful login
        } catch (error) {
          if (error.response.status === 401) {
            this.validationError = 'Invalid username or password';
          } else {
            // handle other errors
          }
        }
      },
    },
  });
  </script>
  
  <style scoped>
  .is-invalid {
    border-color: #dc3545;
  }
  .invalid-feedback {
    color: #dc3545;
  }
  </style>
  