import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cmsService } from '@/services/cmsService';

export const useCmsStore = defineStore('cms', () => {
  const config = ref(null);
  const loading = ref(false);

  const fetchConfig = async () => {
    loading.value = true;
    try {
      config.value = await cmsService.getConfig();
      return config.value;
    } finally {
      loading.value = false;
    }
  };

  const updateConfig = async (data) => {
    config.value = await cmsService.updateConfig(data);
    return config.value;
  };

  return { config, loading, fetchConfig, updateConfig };
});
