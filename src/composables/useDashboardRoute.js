import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

/**
 * Syncs dashboard sidebar active tab with ?tab= query param.
 * @param {Array<{key: string, label: string, icon?: string}>} tabs
 * @param {string} defaultKey
 */
export function useDashboardRoute(tabs, defaultKey) {
  const route = useRoute();
  const router = useRouter();

  const findTab = (key) => tabs.find((t) => t.key === key) || tabs[0];

  const activeTab = ref(findTab(route.query.tab || defaultKey));

  const setTab = (tab) => {
    activeTab.value = tab;
    router.replace({ query: { ...route.query, tab: tab.key } });
  };

  watch(
    () => route.query.tab,
    (key) => {
      if (key && tabs.some((t) => t.key === key)) {
        activeTab.value = findTab(key);
      }
    }
  );

  onMounted(() => {
    if (!route.query.tab) {
      router.replace({ query: { ...route.query, tab: defaultKey } });
    }
  });

  return { activeTab, setTab };
}
