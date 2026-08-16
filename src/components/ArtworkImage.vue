<template>
  <div>
    <img
      :src="resolvedUrl"
      :alt="alt"
    >
  </div>
</template>

<script>
import { resolveMediaUrl } from '@/utils/unwrap';

export default {
  props: {
    imageUrl: { type: String, default: '' },
    src: { type: String, default: '' },
    alt: { type: String, default: 'Artwork' }
  },
  computed: {
    resolvedUrl() {
      return resolveMediaUrl(this.imageUrl || this.src);
    }
  }
};
</script>
