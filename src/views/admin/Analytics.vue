<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Analytics</h1>
      <div class="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard title="GMV" value="$48,200" icon="fas fa-dollar-sign" color="green" change="+12% this month" />
        <StatCard title="Orders" value="156" icon="fas fa-shopping-bag" color="blue" change="+8%" />
        <StatCard title="New Artists" value="23" icon="fas fa-palette" color="purple" change="+3 this week" />
        <StatCard title="Conversion" value="3.2%" icon="fas fa-chart-line" color="yellow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { StatCard } from '@/components/common';
</script>
