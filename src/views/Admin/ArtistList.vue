<template>
<SearchUser/>
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
            <th>Action</th>
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
              <td colspan="7">No users available.</td>
            </tr>
          </template>
        </tbody>
      </table>
  
      <button @click="deleteSelectedUsers" :disabled="selectedUsers.length === 0">
        Delete Selected
      </button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import SearchUser from '@/components/SearchUser.vue'
  export default {
    data() {
      return {
        users: [],
        selectedUsers: []
      };
    },
    components:{
SearchUser
    },
    mounted() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios
          .get('http://localhost:8082/api/users/artist-list')
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      editUser(userId) {
        this.$router.push(`http://localhost:8082/api/users/edit-user/${userId}`);
      },
      confirmDeleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
          this.deleteUser(userId);
        }
      },
      deleteUser(userId) {
        axios
          .delete(`http://localhost:8082/api/users/${userId}`)
          .then(() => {
            this.fetchUsers();
          })
          .catch((error) => {
            console.error(error);
          });
      },
      toggleUserSelection(userId) {
        const index = this.selectedUsers.indexOf(userId);
        if (index === -1) {
          this.selectedUsers.push(userId);
        } else {
          this.selectedUsers.splice(index, 1);
        }
      },
      deleteSelectedUsers() {
        if (confirm('Are you sure you want to delete the selected users?')) {
          axios
            .delete('http://localhost:8082/api/users', { data: { ids: this.selectedUsers } })
            .then(() => {
              this.fetchUsers();
              this.selectedUsers = [];
            })
            .catch((error) => {
              console.error(error);
            });
        }
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
  
  button.delete-selected {
    margin-top: 20px;
    padding: 8px 16px;
    background-color: #e71d36;
    color: #fff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button.delete-selected:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  button.delete-selected:hover {
    background-color: #c41e2d;
  }
  
  /* Responsive Styles */
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
  
  
  
  