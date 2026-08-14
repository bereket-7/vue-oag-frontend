<template>
  <div class="bg-white rounded-lg border p-4">
    <h3 class="font-semibold mb-3">
      Bid History
    </h3>
    <div
      v-if="bids?.length"
      class="space-y-2 max-h-48 overflow-y-auto"
    >
      <div
        v-for="bid in bids"
        :key="bid.id"
        class="flex justify-between text-sm"
      >
        <span>{{ bid.userName }}</span>
        <span class="font-medium">{{ formatPrice(bid.amount) }}</span>
      </div>
    </div>
    <p
      v-else
      class="text-gray-400 text-sm"
    >
      No bids yet
    </p>
  </div>
</template>

<script setup>
import { formatPrice } from '@/utils/currency';
defineProps({ bids: Array });
</script>
