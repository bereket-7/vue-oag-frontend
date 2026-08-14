<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <h1 class="text-3xl font-bold mb-8">
        Platform Settings
      </h1>
      <form
        class="bg-white rounded-xl shadow-md p-8 space-y-4"
        @submit.prevent="save"
      >
        <BaseInput
          v-model="form.heroTitle"
          label="Homepage Hero Title"
        />
        <BaseInput
          v-model="form.heroSubtitle"
          label="Homepage Hero Subtitle"
        />
        <BaseInput
          v-model="form.commissionRate"
          label="Commission Rate (%)"
          type="number"
        />
        <BaseButton
          type="submit"
          :loading="loading"
        >
          Save Settings
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCmsStore } from '@/stores/cms';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, BaseButton } from '@/components/common';

const cmsStore = useCmsStore();
const { success } = useNotification();
const loading = ref(false);
const form = ref({ heroTitle: '', heroSubtitle: '', commissionRate: 15 });

onMounted(async () => {
  const config = await cmsStore.fetchConfig();
  form.value = { ...form.value, ...config };
});

const save = async () => {
  loading.value = true;
  await cmsStore.updateConfig(form.value);
  success('Settings saved!');
  loading.value = false;
};
</script>
