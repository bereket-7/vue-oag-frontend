import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('artwork');

export const artworkService = {
  getAll: (params) => adapter().getAll(params),
  getById: (id) => adapter().getById(id),
  create: (data) => adapter().create(data),
  update: (id, data) => adapter().update(id, data),
  delete: (id) => adapter().delete(id),
  search: (query) => adapter().search(query),
  getRecent: (limit) => adapter().getRecent(limit),
  getByCategory: (category) => adapter().getByCategory(category),
  rate: (id, rating) => adapter().rate(id, rating),
  getPending: () => adapter().getPending(),
  accept: (id) => adapter().accept(id),
  reject: (id) => adapter().reject(id)
};
