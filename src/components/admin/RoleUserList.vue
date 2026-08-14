<template>
  <div>
    <PageHeader
      :title="title"
      :subtitle="subtitle"
      :eyebrow="eyebrow"
    >
      <template
        v-if="$slots.actions"
        #actions
      >
        <slot name="actions" />
      </template>
    </PageHeader>

    <!-- Filters -->
    <div class="page-card p-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center">
      <div class="relative flex-1">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          v-model="search"
          type="search"
          placeholder="Search by name, email, username..."
          class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
        >
      </div>
      <select
        v-model="statusFilter"
        class="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">
          All statuses
        </option>
        <option value="active">
          Active
        </option>
        <option value="pending">
          Pending
        </option>
        <option value="suspended">
          Suspended
        </option>
      </select>
      <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {{ filtered.length }} result{{ filtered.length === 1 ? '' : 's' }}
      </span>
    </div>

    <PageLoader v-if="loading" />

    <EmptyState
      v-else-if="!filtered.length"
      :title="`No ${roleLabel.toLowerCase()}s found`"
      message="Try adjusting your search or filters."
      icon="fas fa-users"
    />

    <div
      v-else
      class="page-card overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/50">
              <th class="th">
                User
              </th>
              <th class="th hidden md:table-cell">
                Contact
              </th>
              <th class="th hidden lg:table-cell">
                Joined
              </th>
              <th class="th">
                Status
              </th>
              <th class="th text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in paginated"
              :key="user.id"
              class="border-b border-gray-50 dark:border-gray-800/60 hover:bg-purple-50/40 dark:hover:bg-purple-900/10 transition-colors"
            >
              <td class="td">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {{ initials(user) }}
                  </div>
                  <div class="min-w-0">
                    <p class="font-semibold text-gray-900 dark:text-white truncate">
                      {{ displayName(user) }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                      @{{ user.username }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="td hidden md:table-cell">
                <p class="text-sm text-gray-700 dark:text-gray-300">
                  {{ user.email }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ user.phone || '—' }}
                </p>
              </td>
              <td class="td hidden lg:table-cell text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(user.joinedAt) }}
              </td>
              <td class="td">
                <span
                  class="status-pill"
                  :class="statusClass(user.status)"
                >
                  {{ user.status || 'active' }}
                </span>
              </td>
              <td class="td text-right">
                <div class="inline-flex items-center gap-1">
                  <button
                    type="button"
                    class="icon-btn"
                    title="View"
                    @click="$emit('view', user)"
                  >
                    <i class="fas fa-eye" />
                  </button>
                  <button
                    type="button"
                    class="icon-btn text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20"
                    title="Delete"
                    @click="confirmDelete(user)"
                  >
                    <i class="fas fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="pageCount > 1"
        class="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800"
      >
        <button
          type="button"
          class="pager-btn"
          :disabled="page === 1"
          @click="page--"
        >
          Previous
        </button>
        <span class="text-sm text-gray-500">Page {{ page }} of {{ pageCount }}</span>
        <button
          type="button"
          class="pager-btn"
          :disabled="page === pageCount"
          @click="page++"
        >
          Next
        </button>
      </div>
    </div>

    <BaseModal
      v-model="showDelete"
      title="Delete user"
      size="sm"
    >
      <p class="text-gray-700 dark:text-gray-300">
        Delete <strong>{{ selected ? displayName(selected) : '' }}</strong>? This cannot be undone.
      </p>
      <template #footer>
        <BaseButton
          variant="secondary"
          @click="showDelete = false"
        >
          Cancel
        </BaseButton>
        <BaseButton
          variant="danger"
          :loading="deleting"
          @click="handleDelete"
        >
          Delete
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { userService } from '@/services/userService';
import { useNotification } from '@/composables/useNotification';
import { PageHeader, PageLoader, EmptyState, BaseModal, BaseButton } from '@/components/common';

const props = defineProps({
  role: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: 'Administration' }
});

defineEmits(['view']);

const { success, error: showError } = useNotification();

const users = ref([]);
const loading = ref(true);
const search = ref('');
const statusFilter = ref('');
const page = ref(1);
const pageSize = 8;
const showDelete = ref(false);
const selected = ref(null);
const deleting = ref(false);

const roleLabel = computed(() => props.role.charAt(0) + props.role.slice(1).toLowerCase());

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase();
  return users.value.filter((u) => {
    if (statusFilter.value && (u.status || 'active') !== statusFilter.value) return false;
    if (!q) return true;
    const hay = `${u.firstName} ${u.lastName} ${u.username} ${u.email}`.toLowerCase();
    return hay.includes(q);
  });
});

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));

const paginated = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filtered.value.slice(start, start + pageSize);
});

watch([search, statusFilter], () => { page.value = 1; });

const displayName = (u) => `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.username;
const initials = (u) => {
  const a = (u.firstName || u.username || '?')[0];
  const b = (u.lastName || '')[0] || '';
  return (a + b).toUpperCase();
};
const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
const statusClass = (s) => ({
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  suspended: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
}[s || 'active']);

const load = async () => {
  loading.value = true;
  try {
    const all = await userService.getAllUsers();
    users.value = all.filter((u) => String(u.role).toUpperCase() === props.role.toUpperCase());
  } catch {
    users.value = [];
    showError('Failed to load users');
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (user) => {
  selected.value = user;
  showDelete.value = true;
};

const handleDelete = async () => {
  deleting.value = true;
  try {
    await userService.deleteUser(selected.value.id);
    success('User deleted');
    showDelete.value = false;
    await load();
  } catch {
    showError('Failed to delete user');
  } finally {
    deleting.value = false;
  }
};

onMounted(load);
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
.th { @apply px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400; }
.td { @apply px-4 py-3.5; }
.status-pill { @apply inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize; }
.icon-btn { @apply w-8 h-8 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors; }
.pager-btn { @apply px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800; }
</style>
