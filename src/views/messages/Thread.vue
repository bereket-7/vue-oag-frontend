<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <router-link
        to="/messages"
        class="text-purple-600 text-sm mb-4 inline-block"
      >
        <i class="fas fa-arrow-left mr-1" /> Inbox
      </router-link>
      <div class="bg-white rounded-xl shadow-md p-6 min-h-[400px] flex flex-col">
        <div class="flex-1 space-y-4 mb-4 overflow-y-auto">
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['max-w-[80%] p-3 rounded-lg text-sm', msg.senderId === authStore.user?.id ? 'ml-auto bg-purple-600 text-white' : 'bg-gray-100']"
          >
            <p class="font-medium text-xs mb-1 opacity-75">
              {{ msg.senderName }}
            </p>
            {{ msg.body }}
          </div>
        </div>
        <form
          class="flex gap-2"
          @submit.prevent="send"
        >
          <input
            v-model="body"
            class="flex-1 border rounded-lg px-4 py-2"
            placeholder="Type a message..."
            required
          >
          <BaseButton type="submit">
            Send
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMessageStore } from '@/stores/messages';
import { useAuthStore } from '@/stores/auth';
import { BaseButton } from '@/components/common';

const route = useRoute();
const messageStore = useMessageStore();
const authStore = useAuthStore();
const { currentThread: messages } = storeToRefs(messageStore);
const body = ref('');

const send = async () => {
  await messageStore.sendMessage(route.params.threadId, body.value);
  body.value = '';
};

onMounted(() => messageStore.fetchThread(route.params.threadId));
</script>
