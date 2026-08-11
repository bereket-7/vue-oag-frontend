import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('artist');

export const artistService = {
  getAll: () => adapter().getAll(),
  getBySlug: (slug) => adapter().getBySlug(slug),
  follow: (artistId, userId) => adapter().follow(artistId, userId),
  unfollow: (artistId) => adapter().unfollow(artistId),
  getFollowed: () => adapter().getFollowed()
};
