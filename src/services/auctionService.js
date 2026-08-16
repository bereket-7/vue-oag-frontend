import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('auction');

export const auctionService = {
  getAll: () => adapter().getAll(),
  getById: (id) => adapter().getById(id),
  create: (data) => adapter().create(data),
  placeBid: (auctionId, amount) => adapter().placeBid(auctionId, amount),
  watch: (auctionId) => adapter().watch(auctionId),
  unwatch: (auctionId) => adapter().unwatch(auctionId)
};
