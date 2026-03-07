<template>
  <div class="space-y-6">
    <DataTable
      :title="`${userType} Management`"
      :columns="columns"
      :data="users"
      :loading="loading"
      @add="showAddModal = true"
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <template #cell-status="{ row }">
        <span
          :class="[
            'px-2 py-1 text-xs font-medium rounded-full',
            row.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          ]"
        >
          {{ row.status }}
        </span>
      </template>

      <template #cell-avatar="{ row }">
        <img
          :src="row.avatar || 'https://via.placeholder.com/40'"
          alt=""
          class="w-10 h-10 rounded-full object-cover"
        />
      </template>

      <template #cell-role="{ row }">
        <span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          {{ row.role }}
        </span>
      </template>
    </DataTable>

    <BaseModal v-model="showEditModal" title="Edit User" size="md">
      <form @submit.prevent="handleUpdate" class="space-y-4">
        <BaseInput v-model="editForm.name" label="Name" required />
        <BaseInput v-model="editForm.email" type="email" label="Email" required />
        <BaseInput v-model="editForm.phone" label="Phone" />
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="editForm.status"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </form>

      <template #footer>
        <BaseButton variant="secondary" @click="showEditModal = false">
          Cancel
        </BaseButton>
        <BaseButton variant="primary" :loading="updating" @click="handleUpdate">
          Update
        </BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showDeleteModal" title="Confirm Delete" size="sm">
      <p class="text-gray-700">Are you sure you want to delete this user?</p>
      
      <template #footer>
        <BaseButton variant="secondary" @click="showDeleteModal = false">
          Cancel
        </BaseButton>
        <BaseButton variant="danger" @click="confirmDelete" :loading="deleting">
          Delete
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNotification } from '@/composables/useNotification';
import DataTable from '@/components/common/DataTable.vue';
import { BaseModal, BaseButton, BaseInput } from '@/components/common';
import api from '@/services/api';

const props = defineProps({
  userType: {
    type: String,
    required: true
  },
  endpoint: {
    type: String,
    required: true
  }
});

const { success, error: showError } = useNotification();

const users = ref([]);
const loading = ref(false);
const updating = ref(false);
const deleting = ref(false);
const showAddModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const selectedUser = ref(null);

const columns = [
  { key: 'avatar', label: 'Avatar' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
];

const editForm = ref({
  name: '',
  email: '',
  phone: '',
  status: 'active'
});

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await api.get(props.endpoint);
    users.value = response.data;
  } catch (err) {
    showError('Failed to load users');
  } finally {
    loading.value = false;
  }
};

const handleEdit = (user) => {
  selectedUser.value = user;
  editForm.value = { ...user };
  showEditModal.value = true;
};

const handleUpdate = async () => {
  updating.value = true;
  try {
    await api.put(`${props.endpoint}/${selectedUser.value.id}`, editForm.value);
    success('User updated successfully');
    showEditModal.value = false;
    await fetchUsers();
  } catch (err) {
    showError('Failed to update user');
  } finally {
    updating.value = false;
  }
};

const handleDelete = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const confirmDelete = async () => {
  deleting.value = true;
  try {
    await api.delete(`${props.endpoint}/${selectedUser.value.id}`);
    success('User deleted successfully');
    showDeleteModal.value = false;
    await fetchUsers();
  } catch (err) {
    showError('Failed to delete user');
  } finally {
    deleting.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
