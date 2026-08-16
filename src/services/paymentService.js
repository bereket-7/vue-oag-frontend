import { checkoutService } from '@/services/checkoutService';

export const paymentService = {
  checkout: (data) => checkoutService.initiate(data)
};
