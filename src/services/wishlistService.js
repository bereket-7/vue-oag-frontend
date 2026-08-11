import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('wishlist');

export const wishlistService = {
  getAll: () => adapter().getAll(),
  toggle: (artwork) => adapter().toggle(artwork),
  remove: (id) => adapter().remove(id),
  isInWishlist: (artworkId) => adapter().isInWishlist(artworkId)
};
