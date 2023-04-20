<template>
    <div class="container">
      <h1>User</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-primary" @click="editUser(user)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deleteUser(user)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserList',
    data() {
      return {
        users: [],
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        axios.get('/api/users')
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      // eslint-disable-next-line no-unused-vars
      editUser(user) {
        // TODO: Implement edit user logic
      },
      deleteUser(user) {
        axios.delete(`/api/users/${user.id}`)
          .then(() => {
            this.getUsers();
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  