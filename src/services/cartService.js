import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('cart');

export const cartService = {
  getAll: () => adapter().getAll(),
  add: (artworkId, quantity) => adapter().add(artworkId, quantity),
  update: (itemId, quantity) => adapter().update(itemId, quantity),
  remove: (itemId) => adapter().remove(itemId),
  clear: () => adapter().clear()
};
