import { ref } from 'vue';
import { unwrapEnvelope, envelopeMessage } from '@/utils/unwrap';

export function useApi(apiFunction) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const execute = async (...args) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await apiFunction(...args);
      const unwrapped = response?.data !== undefined ? unwrapEnvelope(response.data) : response;
      data.value = unwrapped;
      return { success: true, data: unwrapped };
    } catch (err) {
      error.value = envelopeMessage(err);
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
