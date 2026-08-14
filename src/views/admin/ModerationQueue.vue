<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">
        Moderation Queue
      </h1>
      <div class="flex gap-2 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="['px-4 py-2 rounded-lg text-sm font-medium', activeTab === tab ? 'bg-purple-600 text-white' : 'bg-white text-gray-600']"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <div class="space-y-4">
        <div
          v-for="item in filtered"
          :key="item.id"
          class="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
        >
          <div>
            <span class="text-xs uppercase text-gray-400">{{ item.type }}</span>
            <p class="font-bold">
              {{ item.title }}
            </p>
            <p class="text-sm text-gray-500">
              {{ item.submittedAt }}
            </p>
          </div>
          <div
            v-if="item.status === 'pending'"
            class="flex gap-2"
          >
            <BaseButton
              size="sm"
              @click="approve(item.id)"
            >
              Approve
            </BaseButton>
            <BaseButton
              size="sm"
              variant="outline"
              @click="reject(item.id)"
            >
              Reject
            </BaseButton>
          </div>
          <span
            v-else
            class="text-sm capitalize"
            :class="item.status === 'approved' ? 'text-green-600' : 'text-red-600'"
          >{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { moderationService } from '@/services/moderationService';
import { useNotification } from '@/composables/useNotification';
import { BaseButton } from '@/components/common';

const queue = ref([]);
const activeTab = ref('All');
const tabs = ['All', 'artwork', 'report', 'event'];
const { success } = useNotification();

const filtered = computed(() => activeTab.value === 'All' ? queue.value : queue.value.filter((i) => i.type === activeTab.value));

const approve = async (id) => { await moderationService.approve(id); queue.value = await moderationService.getQueue(); success('Approved'); };
const reject = async (id) => { await moderationService.reject(id); queue.value = await moderationService.getQueue(); success('Rejected'); };

onMounted(async () => { queue.value = await moderationService.getQueue(); });
</script>
