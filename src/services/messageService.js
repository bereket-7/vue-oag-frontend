import { getAdapter } from '@/services/adapters';

const adapter = () => getAdapter('message');

export const messageService = {
  getThreads: () => adapter().getThreads(),
  getThread: (threadId) => adapter().getThread(threadId),
  send: (threadId, senderId, senderName, body) => adapter().send(threadId, senderId, senderName, body)
};
