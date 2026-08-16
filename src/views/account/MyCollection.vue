<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">
        My Collection
      </h1>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="item in owned"
          :key="item.id"
          class="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <img
            :src="item.imageUrl"
            :alt="item.artworkName"
            class="w-full h-40 object-cover"
            loading="lazy"
          >
          <div class="p-4">
            <p class="font-medium">
              {{ item.artworkName }}
            </p>
            <p class="text-sm text-gray-500">
              Purchased {{ item.purchasedAt }}
            </p>
          </div>
        </div>
      </div>
      <EmptyState
        v-if="!owned.length"
        title="No owned artworks"
        message="Artworks you purchase will appear here."
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useOrderStore } from '@/stores/orders';
import { EmptyState } from '@/components/common';

const owned = ref([]);
const orderStore = useOrderStore();

onMounted(async () => {
  const orders = await orderStore.fetchOrders();
  owned.value = orders.filter((o) => o.status === 'delivered' || o.status === 'paid').flatMap((o) =>
    o.items.map((i) => ({ ...i, purchasedAt: new Date(o.createdAt).toLocaleDateString() }))
  );
});
</script>
