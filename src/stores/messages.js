import { defineStore } from 'pinia';
import { ref } from 'vue';
import { messageService } from '@/services/messageService';

export const useMessageStore = defineStore('messages', () => {
  const threads = ref([]);
  const currentThread = ref([]);
  const loading = ref(false);

  const fetchThreads = async () => {
    loading.value = true;
    try {
      threads.value = await messageService.getThreads();
      return threads.value;
    } finally {
      loading.value = false;
    }
  };

  const fetchThread = async (threadId) => {
    loading.value = true;
    try {
      currentThread.value = await messageService.getThread(threadId);
      return currentThread.value;
    } finally {
      loading.value = false;
    }
  };

  const sendMessage = async (threadId, body) => {
    const msg = await messageService.send(threadId, body);
    currentThread.value.push(msg);
    return msg;
  };

  return { threads, currentThread, loading, fetchThreads, fetchThread, sendMessage };
});
