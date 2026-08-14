<template>
  <p class="text-sm text-gray-500">
    <i class="fas fa-clock mr-1" /> {{ label }}
  </p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({ endsAt: String });
const label = ref('');

let timer;
const update = () => {
  const diff = new Date(props.endsAt) - Date.now();
  if (diff <= 0) { label.value = 'Auction ended'; return; }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  label.value = `${d}d ${h}h ${m}m remaining`;
};

onMounted(() => { update(); timer = setInterval(update, 60000); });
onUnmounted(() => clearInterval(timer));
</script>
