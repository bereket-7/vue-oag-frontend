<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">
        User Management
      </h1>
      <DataTable
        :columns="columns"
        :data="users"
        :loading="loading"
        searchable
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { userService } from '@/services/userService';
import { DataTable } from '@/components/common';

const users = ref([]);
const loading = ref(true);
const columns = [
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' }
];

onMounted(async () => {
  users.value = await userService.getAllUsers();
  loading.value = false;
});
</script>
