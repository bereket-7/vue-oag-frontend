import { ref, onMounted, onUnmounted } from 'vue';

export function usePageMeta(defaultTitle = 'KELEM Online Art Gallery') {
  const title = ref(defaultTitle);
  const description = ref('Discover, collect, and showcase extraordinary art.');

  const setMeta = ({ pageTitle, pageDescription } = {}) => {
    if (pageTitle) {
      title.value = pageTitle;
      document.title = `${pageTitle} | KELEM`;
    }
    if (pageDescription) {
      description.value = pageDescription;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = pageDescription;
    }
  };

  onMounted(() => {
    document.title = title.value.includes('KELEM') ? title.value : `${title.value} | KELEM`;
  });

  onUnmounted(() => {
    document.title = defaultTitle;
  });

  return { title, description, setMeta };
}
