<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <PageLoader v-if="loading" />
      <div v-else-if="order" class="bg-white rounded-xl shadow-md p-8">
        <router-link to="/account/orders" class="text-purple-600 text-sm mb-4 inline-block"><i class="fas fa-arrow-left mr-1"></i> Back to Orders</router-link>
        <h1 class="text-2xl font-bold mb-2">Order #{{ order.id }}</h1>
        <p class="text-gray-500 mb-6">Placed on {{ new Date(order.createdAt).toLocaleDateString() }}</p>
        <OrderTimeline :status="order.status" />
        <div class="mt-8 space-y-3">
          <div v-for="item in order.items" :key="item.id" class="flex justify-between py-2 border-b">
            <span>{{ item.artworkName }} × {{ item.quantity }}</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>
        <div class="mt-6 text-right font-bold text-xl">Total: {{ formatPrice(order.total) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/stores/orders';
import { formatPrice } from '@/utils/currency';
import { PageLoader } from '@/components/common';
import OrderTimeline from '@/components/orders/OrderTimeline.vue';

const route = useRoute();
const orderStore = useOrderStore();
const { currentOrder: order, loading } = storeToRefs(orderStore);

onMounted(() => orderStore.fetchOrderById(route.params.id));
</script>
