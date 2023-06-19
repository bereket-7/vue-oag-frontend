<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Username</th>
          <th>Address</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="users.length > 0">
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.role }}</td>

            <td>
              <button @click="editUser(user.id)">
                <i class="fa fa-edit"></i>
              </button>
            </td>
            <td>
              <button @click="confirmDeleteUser(user.id)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="6">No users available.</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('/api/users/all')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    editUser(userId) {
  // Redirect to the edit page with the userId parameter in the URL
  this.$router.push(`/edit-user/${userId}`);
},

    confirmDeleteUser(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.deleteUser(userId);
      }
    },
    deleteUser(userId) {
  axios.delete(`/api/users/${userId}`)
    .then(() => {
      // Handle successful deletion
      this.fetchUsers(); // Refresh the user list
    })
    .catch(error => {
      console.error(error);
      // Handle error response
    });
}

  }
};
</script>

<style scoped>
table {
  margin-top: 100px;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.1);
}

.fa {
  font-size: 18px;
  transition: color 0.3s ease;
}

.fa-edit {
  color: blue;
}

.fa-trash {
  color: red;
}

.fa-edit:hover {
  color: #1761c6;
}

.fa-trash:hover {
  color: #e71d36;
}

@media (max-width: 600px) {
  table {
    margin-top: 80px;
  }

  th, td {
    padding: 5px;
    font-size: 12px;
  }

  .fa {
    font-size: 14px;
  }
}
</style>


