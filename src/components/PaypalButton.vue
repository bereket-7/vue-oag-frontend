<template>
  <button
    type="button"
    class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600"
    @click="$emit('success')"
  >
    Pay with Chapa
  </button>
</template>

<script>
export default {
  name: 'PaypalButton',
  emits: ['success']
};
</script>
