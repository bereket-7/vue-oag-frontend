import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('review');

export const reviewService = {
  getByArtwork: (artworkId) => adapter().getByArtwork(artworkId),
  create: (data) => adapter().create(data)
};
