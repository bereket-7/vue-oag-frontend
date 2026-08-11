<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Verify Artworks</h1>
      <PageLoader v-if="loading" />
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="art in pending" :key="art.id" class="bg-white rounded-xl shadow-md overflow-hidden">
          <img :src="art.imageUrl" :alt="art.title" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="font-bold">{{ art.title }}</h3>
            <p class="text-sm text-gray-500 mb-4">by {{ art.artistName }}</p>
            <div class="flex gap-2">
              <BaseButton size="sm" @click="accept(art.id)">Approve</BaseButton>
              <BaseButton size="sm" variant="outline" @click="reject(art.id)">Reject</BaseButton>
            </div>
          </div>
        </div>
      </div>
      <EmptyState v-if="!loading && !pending.length" title="All caught up" message="No artworks pending verification." />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { artworkService } from '@/services/artworkService';
import { useNotification } from '@/composables/useNotification';
import { PageLoader, EmptyState, BaseButton } from '@/components/common';

const pending = ref([]);
const loading = ref(true);
const { success } = useNotification();

const load = async () => { pending.value = await artworkService.getPending(); loading.value = false; };
const accept = async (id) => { await artworkService.accept(id); success('Approved'); load(); };
const reject = async (id) => { await artworkService.reject(id); success('Rejected'); load(); };

onMounted(load);
</script>
