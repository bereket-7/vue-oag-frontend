import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('message');

export const messageService = {
  getThreads: () => adapter().getThreads(),
  getThread: (threadId) => adapter().getThread(threadId),
  send: (threadId, body) => adapter().send(threadId, body),
  startThread: (data) => adapter().startThread?.(data)
};
