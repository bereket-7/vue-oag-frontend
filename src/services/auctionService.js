import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('auction');

export const auctionService = {
  getAll: () => adapter().getAll(),
  getById: (id) => adapter().getById(id),
  create: (data) => adapter().create(data),
  placeBid: (auctionId, userId, userName, amount) => adapter().placeBid(auctionId, userId, userName, amount),
  watch: (auctionId, userId) => adapter().watch(auctionId, userId),
  unwatch: (auctionId, userId) => adapter().unwatch(auctionId, userId)
};
