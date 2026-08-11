<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold mb-4">Shipping Address</h2>
    <div class="grid grid-cols-2 gap-4">
      <BaseInput v-model="local.firstName" label="First Name" required />
      <BaseInput v-model="local.lastName" label="Last Name" required />
    </div>
    <BaseInput v-model="local.address" label="Address" required />
    <div class="grid grid-cols-3 gap-4">
      <BaseInput v-model="local.city" label="City" required />
      <BaseInput v-model="local.state" label="State" required />
      <BaseInput v-model="local.zip" label="Zip" required />
    </div>
    <BaseInput v-model="local.email" type="email" label="Email" required />
    <BaseInput v-model="local.phone" label="Phone" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { BaseInput } from '@/components/common';

const props = defineProps({ modelValue: Object });
const emit = defineEmits(['update:modelValue']);

const local = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
});
</script>
