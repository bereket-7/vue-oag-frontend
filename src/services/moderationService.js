import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('moderation');

export const moderationService = {
  getQueue: () => adapter().getQueue(),
  approve: (id) => adapter().approve(id),
  reject: (id) => adapter().reject(id)
};
