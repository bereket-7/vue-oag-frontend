<template>
  <input
    v-model="searchTerm"
    type="text"
    placeholder="Search users"
    @input="searchUsers"
  >
  <ul>
    <li
      v-for="user in filteredUsers"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
</template>

<script>
import { userService } from '@/services/userService';

export default {
  data() {
    return {
      searchTerm: '',
      users: [],
      filteredUsers: []
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const data = await userService.getAllUsers();
        this.users = data;
        this.searchUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    searchUsers() {
      this.filteredUsers = this.users.filter(user =>
        (user.name || '').toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
};
</script>
