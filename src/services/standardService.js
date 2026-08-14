import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('standard');

export const standardService = {
  getAll: () => adapter().getAll(),
  create: (data) => adapter().create(data),
  delete: (id) => adapter().delete(id)
};
