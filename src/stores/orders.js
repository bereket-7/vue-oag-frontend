import { defineStore } from 'pinia';
import { ref } from 'vue';
import { orderService } from '@/services/orderService';

export const useOrderStore = defineStore('orders', () => {
  const orders = ref([]);
  const currentOrder = ref(null);
  const loading = ref(false);

  const fetchOrders = async () => {
    loading.value = true;
    try {
      orders.value = await orderService.getAll();
      return orders.value;
    } finally {
      loading.value = false;
    }
  };

  const fetchOrderById = async (id) => {
    loading.value = true;
    try {
      currentOrder.value = await orderService.getById(id);
      return currentOrder.value;
    } finally {
      loading.value = false;
    }
  };

  const createOrder = async (orderData) => {
    loading.value = true;
    try {
      const order = await orderService.create(orderData);
      orders.value.unshift(order);
      return order;
    } finally {
      loading.value = false;
    }
  };

  const updateOrderStatus = async (id, status) => {
    const order = await orderService.updateStatus(id, status);
    const idx = orders.value.findIndex((o) => o.id === id);
    if (idx !== -1) orders.value[idx] = order;
    return order;
  };

  return { orders, currentOrder, loading, fetchOrders, fetchOrderById, createOrder, updateOrderStatus };
});
