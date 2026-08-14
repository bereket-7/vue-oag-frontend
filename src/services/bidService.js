import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('bid');

export const bidService = {
  create: (data) => adapter().create(data)
};
