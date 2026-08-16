import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('offer');

export const offerService = {
  getByArtwork: (artworkId) => adapter().getByArtwork(artworkId),
  create: (data) => adapter().create(data),
  getPendingForArtist: () => adapter().getPendingForArtist(),
  accept: (id) => adapter().accept?.(id)
};
