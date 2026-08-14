<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">
        Order History
      </h1>
      <PageLoader v-if="loading" />
      <div
        v-else-if="orders.length"
        class="space-y-4"
      >
        <router-link
          v-for="order in orders"
          :key="order.id"
          :to="`/account/orders/${order.id}`"
          class="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="font-bold">
                Order #{{ order.id }}
              </p>
              <p class="text-sm text-gray-500">
                {{ new Date(order.createdAt).toLocaleDateString() }}
              </p>
            </div>
            <div class="text-right">
              <span
                :class="statusClass(order.status)"
                class="px-3 py-1 rounded-full text-xs font-medium"
              >{{ order.status }}</span>
              <p class="font-bold mt-1">
                {{ formatPrice(order.total) }}
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <EmptyState
        v-else
        title="No orders yet"
        message="Your purchase history will appear here."
      >
        <template #action>
          <router-link
            to="/allArtwork"
            class="text-purple-600 hover:underline"
          >
            Browse Gallery
          </router-link>
        </template>
      </EmptyState>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/stores/orders';
import { useAuthStore } from '@/stores/auth';
import { formatPrice } from '@/utils/currency';
import { PageLoader, EmptyState } from '@/components/common';

const orderStore = useOrderStore();
const authStore = useAuthStore();
const { orders, loading } = storeToRefs(orderStore);

const statusClass = (s) => ({ paid: 'bg-green-100 text-green-700', shipped: 'bg-blue-100 text-blue-700', delivered: 'bg-purple-100 text-purple-700', pending: 'bg-yellow-100 text-yellow-700' }[s] || 'bg-gray-100 text-gray-700');

onMounted(() => orderStore.fetchOrders(authStore.user?.id));
</script>
