import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('collection');

export const collectionService = {
  getAll: () => adapter().getAll(),
  getBySlug: (slug) => adapter().getBySlug(slug)
};
