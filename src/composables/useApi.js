import { ref } from 'vue';

export function useApi(apiFunction) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const execute = async (...args) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await apiFunction(...args);
      data.value = response.data;
      return { success: true, data: response.data };
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'An error occurred';
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    loading.value = false;
    error.value = null;
  };

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
}
