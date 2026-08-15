import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('payment');

export const paymentService = {
  paypalPay: (data) => adapter().paypalPay(data)
};
