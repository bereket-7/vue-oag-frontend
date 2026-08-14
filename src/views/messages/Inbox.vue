<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <h1 class="text-3xl font-bold mb-8">
        Messages
      </h1>
      <div class="space-y-3">
        <router-link
          v-for="thread in threads"
          :key="thread.threadId"
          :to="`/messages/${thread.threadId}`"
          class="block bg-white rounded-xl shadow-md p-4 hover:shadow-lg"
        >
          <div class="flex justify-between">
            <p class="font-medium">
              {{ thread.lastMessage?.senderName }}
            </p>
            <span
              v-if="thread.unread"
              class="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
            >{{ thread.unread }}</span>
          </div>
          <p class="text-sm text-gray-500 truncate">
            {{ thread.lastMessage?.body }}
          </p>
        </router-link>
      </div>
      <EmptyState
        v-if="!threads.length"
        title="No messages"
        message="Start a conversation with an artist."
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores/messages';
import { EmptyState } from '@/components/common';

const messageStore = useMessageStore();
const { threads } = storeToRefs(messageStore);
onMounted(() => messageStore.fetchThreads());
</script>
