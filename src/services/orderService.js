import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('order');

export const orderService = {
  getAll: () => adapter().getAll(),
  getById: (id) => adapter().getById(id),
  create: (data) => adapter().create(data),
  updateStatus: (id, status) => adapter().updateStatus(id, status)
};
