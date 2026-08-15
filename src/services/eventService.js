import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('event');

export const eventService = {
  getAll: () => adapter().getAll(),
  create: (data) => adapter().create(data),
  update: (id, data) => adapter().update(id, data),
  getPending: () => adapter().getPending(),
  accept: (id) => adapter().accept(id),
  reject: (id) => adapter().reject(id),
  getImage: (id) => adapter().getImage(id)
};
