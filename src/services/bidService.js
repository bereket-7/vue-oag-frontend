import { auctionService } from '@/services/auctionService';

export const bidService = {
  create: (data) => auctionService.placeBid(data.auctionId, data.amount)
};
