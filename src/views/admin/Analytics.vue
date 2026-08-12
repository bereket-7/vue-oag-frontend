<template>
  <div class="min-h-[calc(100vh-5rem)] bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 transition-colors">
    <PageHeader title="Analytics" subtitle="Platform performance and growth metrics" eyebrow="Administration" />

    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <div v-for="kpi in kpis" :key="kpi.label" class="page-card p-5">
        <div class="w-10 h-10 rounded-xl mb-3 flex items-center justify-center" :class="kpi.bg">
          <i :class="[kpi.icon, kpi.color]" />
        </div>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ kpi.value }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ kpi.label }}</p>
        <p v-if="kpi.change" class="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">{{ kpi.change }}</p>
      </div>
    </div>

    <div class="page-card p-6">
      <h3 class="font-bold text-gray-900 dark:text-white mb-2">GMV trend</h3>
      <p class="text-sm text-gray-500 mb-6">Last 6 months</p>
      <div class="flex items-end gap-3 h-40">
        <div v-for="bar in bars" :key="bar.m" class="flex-1 flex flex-col items-center justify-end gap-2 h-full">
          <div class="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-indigo-400" :style="{ height: `${bar.h}%` }" />
          <span class="text-xs text-gray-500">{{ bar.m }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PageHeader } from '@/components/common';

const kpis = [
  { label: 'GMV', value: '$48,200', icon: 'fas fa-dollar-sign', bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600', change: '+12% this month' },
  { label: 'Orders', value: '156', icon: 'fas fa-shopping-bag', bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600', change: '+8%' },
  { label: 'New Artists', value: '23', icon: 'fas fa-palette', bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600', change: '+3 this week' },
  { label: 'Conversion', value: '3.2%', icon: 'fas fa-chart-line', bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600' },
];

const bars = [
  { m: 'Mar', h: 45 },
  { m: 'Apr', h: 60 },
  { m: 'May', h: 52 },
  { m: 'Jun', h: 78 },
  { m: 'Jul', h: 70 },
  { m: 'Aug', h: 92 },
];
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
</style>
