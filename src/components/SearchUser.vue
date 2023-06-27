<template>
    <input type="text" v-model="searchTerm" @input="searchUsers" placeholder="Search users" />
  <ul>
    <li v-for="user in filteredUsers" :key="user.id">{{ user.name }}</li>
  </ul>
</template>

<script>

export default {
  data() {
    return {
      searchTerm: '',
      users: [],
      filteredUsers: []
    };
  },
  methods: {
   
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:8081/user');
        const data = await response.json();
        this.users = data;
        this.searchUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    searchUsers() {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

    
  },
  mounted() {
    this.fetchUsers();
  }
}
}
</script>

<style>


</style>