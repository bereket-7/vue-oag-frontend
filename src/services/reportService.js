import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('report');

export const reportService = {
  create: (data) => adapter().create(data),
  getAll: () => adapter().getAll()
};
