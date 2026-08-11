import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('offer');

export const offerService = {
  getByArtwork: (artworkId) => adapter().getByArtwork(artworkId),
  create: (data) => adapter().create(data),
  getPendingForArtist: (artistId) => adapter().getPendingForArtist(artistId)
};
