<template>
  <div class="flex items-center gap-0 my-8">
    <div v-for="(s, i) in steps" :key="s.key" class="flex items-center flex-1">
      <div class="flex flex-col items-center flex-1">
        <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold', isActive(s.key) ? 'bg-purple-600 text-white' : isPast(s.key) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500']">
          <i v-if="isPast(s.key)" class="fas fa-check"></i>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span class="text-xs mt-1 capitalize">{{ s.label }}</span>
      </div>
      <div v-if="i < steps.length - 1" :class="['h-0.5 flex-1', isPast(steps[i + 1].key) ? 'bg-green-500' : 'bg-gray-200']"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ status: String });
const steps = [
  { key: 'pending', label: 'Pending' },
  { key: 'paid', label: 'Paid' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' }
];
const order = ['pending', 'paid', 'shipped', 'delivered'];
const isActive = (key) => props.status === key;
const isPast = (key) => order.indexOf(props.status) >= order.indexOf(key);
</script>
