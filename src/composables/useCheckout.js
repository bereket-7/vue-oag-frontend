import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useOrderStore } from '@/stores/orders';
import { useAuthStore } from '@/stores/auth';
import { checkoutService } from '@/services/checkoutService';
import { isMockMode } from '@/services/adapters';
import { calculateShipping, calculateTax } from '@/utils/currency';
import { isSafeExternalUrl } from '@/utils/security';

export function useCheckout() {
  const router = useRouter();
  const cartStore = useCartStore();
  const orderStore = useOrderStore();
  const authStore = useAuthStore();

  const step = ref(1);
  const loading = ref(false);
  const error = ref(null);
  const shippingAddress = ref({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: ''
  });

  const subtotal = () => cartStore.totalPrice;
  const shipping = () => calculateShipping(subtotal());
  const tax = () => calculateTax(subtotal());
  const total = () => subtotal() + shipping() + tax();

  const nextStep = () => { if (step.value < 4) step.value++; };
  const prevStep = () => { if (step.value > 1) step.value--; };

  const toOrderRequest = () => {
    const ship = shippingAddress.value;
    return {
      firstname: ship.firstName,
      lastname: ship.lastName,
      email: ship.email,
      phone: ship.phone,
      address: {
        street: ship.address,
        city: ship.city,
        state: ship.state,
        country: 'ET',
        postalCode: ship.zip
      }
    };
  };

  const placeOrder = async (paymentMethod = 'mock') => {
    loading.value = true;
    error.value = null;
    try {
      const order = await orderStore.createOrder({
        userId: authStore.user?.id,
        items: cartStore.items,
        shippingAddress: shippingAddress.value,
        paymentMethod
      });
      await cartStore.clearCart();
      router.push({ path: '/paymentSuccess', query: { orderId: order.id } });
      return order;
    } catch (e) {
      error.value = e.message || 'Order failed';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const payWithChapa = async () => {
    if (isMockMode()) {
      return placeOrder('mock');
    }
    loading.value = true;
    error.value = null;
    try {
      const result = await checkoutService.initiate(toOrderRequest());
      const url = result?.checkOutUrl;
      if (url && isSafeExternalUrl(url)) {
        window.location.assign(url);
        return result;
      }
      throw new Error('Checkout did not return a payment URL');
    } catch (e) {
      error.value = e.message || 'Checkout failed';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  return {
    step,
    loading,
    error,
    shippingAddress,
    subtotal,
    shipping,
    tax,
    total,
    nextStep,
    prevStep,
    placeOrder,
    payWithChapa
  };
}
