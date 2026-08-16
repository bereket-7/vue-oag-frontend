import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('checkout');

export const checkoutService = {
  initiate: (orderRequest) => adapter().initiate(orderRequest)
};
