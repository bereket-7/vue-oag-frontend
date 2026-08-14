<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Overview -->
    <template v-if="activeTab.key === 'overview'">
      <PageHeader
        title="Admin Overview"
        subtitle="Platform health, growth, and user activity at a glance"
        eyebrow="Administration"
      />

      <!-- KPI cards -->
      <div class="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          v-for="kpi in kpis"
          :key="kpi.label"
          class="page-card p-5 relative overflow-hidden"
        >
          <div
            class="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10"
            :class="kpi.blob"
          />
          <div class="flex items-start justify-between mb-3">
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center"
              :class="kpi.iconBg"
            >
              <i :class="[kpi.icon, kpi.iconColor]" />
            </div>
            <span
              class="text-xs font-semibold px-2 py-1 rounded-full"
              :class="kpi.trendClass"
            >{{ kpi.trend }}</span>
          </div>
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ kpi.value }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ kpi.label }}
          </p>
        </div>
      </div>

      <!-- Analytics row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Revenue / GMV bars -->
        <div class="page-card p-6 lg:col-span-2">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="font-bold text-gray-900 dark:text-white">
                Monthly GMV
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Gross merchandise value (ETB k)
              </p>
            </div>
            <span class="text-sm font-semibold text-purple-600 dark:text-purple-400">+18% vs last period</span>
          </div>
          <div class="flex items-end gap-2 sm:gap-3 h-48">
            <div
              v-for="bar in monthlyGmv"
              :key="bar.month"
              class="flex-1 flex flex-col items-center gap-2 h-full justify-end"
            >
              <span class="text-[10px] text-gray-400 font-medium">{{ bar.value }}</span>
              <div
                class="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-indigo-400 dark:from-purple-500 dark:to-indigo-400 opacity-90 hover:opacity-100 transition-all"
                :style="{ height: `${(bar.value / maxGmv) * 100}%` }"
              />
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ bar.month }}</span>
            </div>
          </div>
        </div>

        <!-- Role distribution -->
        <div class="page-card p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-1">
            User mix
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
            Share by role
          </p>
          <div class="space-y-4">
            <div
              v-for="seg in roleMix"
              :key="seg.label"
            >
              <div class="flex justify-between text-sm mb-1.5">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ seg.label }}</span>
                <span class="text-gray-500">{{ seg.count }} · {{ seg.pct }}%</span>
              </div>
              <div class="h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all"
                  :class="seg.color"
                  :style="{ width: `${seg.pct}%` }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Secondary metrics + activity -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="page-card p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">
            Platform pulse
          </h3>
          <div class="space-y-4">
            <div
              v-for="metric in pulse"
              :key="metric.label"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                  <i :class="[metric.icon, 'text-purple-600 dark:text-purple-400 text-sm']" />
                </div>
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ metric.label }}</span>
              </div>
              <span class="font-bold text-gray-900 dark:text-white">{{ metric.value }}</span>
            </div>
          </div>
        </div>

        <div class="page-card p-6 lg:col-span-2">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-gray-900 dark:text-white">
              Recent registrations
            </h3>
            <button
              type="button"
              class="text-sm font-medium text-purple-600 dark:text-purple-400"
              @click="setTab(tabs.find(t => t.key === 'artists'))"
            >
              View all
            </button>
          </div>
          <div class="space-y-2">
            <div
              v-for="user in recentUsers"
              :key="user.id"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                {{ (user.firstName || '?')[0] }}{{ (user.lastName || '')[0] || '' }}
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 dark:text-white truncate">
                  {{ user.firstName }} {{ user.lastName }}
                </p>
                <p class="text-xs text-gray-500 truncate">
                  {{ user.email }}
                </p>
              </div>
              <span class="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 capitalize">
                {{ String(user.role).toLowerCase() }}
              </span>
              <span class="text-xs text-gray-400 whitespace-nowrap">{{ relativeJoin(user.joinedAt) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="page-card p-6">
        <h3 class="font-bold text-gray-900 dark:text-white mb-4">
          Quick actions
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            v-for="action in quickActions"
            :key="action.key"
            type="button"
            class="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all group"
            @click="setTab(tabs.find(t => t.key === action.key))"
          >
            <i :class="[action.icon, 'text-xl text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400']" />
            <span class="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{{ action.label }}</span>
          </button>
        </div>
      </div>
    </template>

    <RoleUserList
      v-else-if="activeTab.key === 'artists'"
      role="ARTIST"
      title="Artists"
      subtitle="Manage artist accounts and verification status"
    />
    <RoleUserList
      v-else-if="activeTab.key === 'customers'"
      role="CUSTOMER"
      title="Customers"
      subtitle="Collectors and buyers on the platform"
    />
    <RoleUserList
      v-else-if="activeTab.key === 'organizations'"
      role="ORGANIZATION"
      title="Organizations"
      subtitle="Galleries and partner organizations"
    />
    <RoleUserList
      v-else-if="activeTab.key === 'managers'"
      role="MANAGER"
      title="Managers"
      subtitle="Platform managers and moderators"
    />
    <RegisterOrganization
      v-else-if="activeTab.key === 'register-org'"
      embedded
    />
    <ContactUser
      v-else-if="activeTab.key === 'contact'"
      embedded
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { userService } from '@/services/userService';
import { useDashboardRoute } from '@/composables/useDashboardRoute';
import { PageHeader } from '@/components/common';
import RoleUserList from '@/components/admin/RoleUserList.vue';
import RegisterOrganization from '@/views/Organization/RegisterOrganization.MODERN.vue';
import ContactUser from '@/views/Manager/ContactUser.MODERN.vue';

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'artists', label: 'Artists' },
  { key: 'customers', label: 'Customers' },
  { key: 'organizations', label: 'Organizations' },
  { key: 'managers', label: 'Managers' },
  { key: 'register-org', label: 'Register Organization' },
  { key: 'contact', label: 'Contact' },
];

const { activeTab, setTab } = useDashboardRoute(tabs, 'overview');

const allUsers = ref([]);

const countRole = (role) => allUsers.value.filter((u) => String(u.role).toUpperCase() === role).length;

const kpis = computed(() => [
  { label: 'Artists', value: countRole('ARTIST'), icon: 'fas fa-palette', iconBg: 'bg-purple-100 dark:bg-purple-900/40', iconColor: 'text-purple-600 dark:text-purple-400', blob: 'bg-purple-500', trend: '+12%', trendClass: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { label: 'Customers', value: countRole('CUSTOMER'), icon: 'fas fa-users', iconBg: 'bg-blue-100 dark:bg-blue-900/40', iconColor: 'text-blue-600 dark:text-blue-400', blob: 'bg-blue-500', trend: '+8%', trendClass: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { label: 'Organizations', value: countRole('ORGANIZATION'), icon: 'fas fa-building', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', iconColor: 'text-emerald-600 dark:text-emerald-400', blob: 'bg-emerald-500', trend: '+3', trendClass: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  { label: 'Managers', value: countRole('MANAGER'), icon: 'fas fa-user-tie', iconBg: 'bg-amber-100 dark:bg-amber-900/40', iconColor: 'text-amber-600 dark:text-amber-400', blob: 'bg-amber-500', trend: 'Active', trendClass: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300' },
]);

const monthlyGmv = [
  { month: 'Mar', value: 32 },
  { month: 'Apr', value: 41 },
  { month: 'May', value: 38 },
  { month: 'Jun', value: 52 },
  { month: 'Jul', value: 48 },
  { month: 'Aug', value: 61 },
];
const maxGmv = Math.max(...monthlyGmv.map((b) => b.value));

const roleMix = computed(() => {
  const total = Math.max(allUsers.value.filter((u) => u.role !== 'ADMIN').length, 1);
  const rows = [
    { label: 'Customers', role: 'CUSTOMER', color: 'bg-blue-500' },
    { label: 'Artists', role: 'ARTIST', color: 'bg-purple-500' },
    { label: 'Organizations', role: 'ORGANIZATION', color: 'bg-emerald-500' },
    { label: 'Managers', role: 'MANAGER', color: 'bg-amber-500' },
  ];
  return rows.map((r) => {
    const count = countRole(r.role);
    return { ...r, count, pct: Math.round((count / total) * 100) };
  });
});

const pulse = [
  { label: 'Pending artworks', value: '14', icon: 'fas fa-clock' },
  { label: 'Open auctions', value: '7', icon: 'fas fa-gavel' },
  { label: 'Active competitions', value: '2', icon: 'fas fa-trophy' },
  { label: 'Unread reports', value: '5', icon: 'fas fa-flag' },
];

const recentUsers = computed(() =>
  [...allUsers.value]
    .filter((u) => u.role !== 'ADMIN')
    .sort((a, b) => new Date(b.joinedAt || 0) - new Date(a.joinedAt || 0))
    .slice(0, 5)
);

const quickActions = [
  { key: 'artists', label: 'Artists', icon: 'fas fa-palette' },
  { key: 'customers', label: 'Customers', icon: 'fas fa-users' },
  { key: 'organizations', label: 'Orgs', icon: 'fas fa-building' },
  { key: 'managers', label: 'Managers', icon: 'fas fa-user-tie' },
  { key: 'register-org', label: 'Register Org', icon: 'fas fa-plus-circle' },
  { key: 'contact', label: 'Contact', icon: 'fas fa-envelope' },
];

const relativeJoin = (d) => {
  if (!d) return '';
  const days = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
  if (days < 1) return 'Today';
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
};

onMounted(async () => {
  try {
    allUsers.value = await userService.getAllUsers();
  } catch {
    allUsers.value = [];
  }
});
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
</style>
