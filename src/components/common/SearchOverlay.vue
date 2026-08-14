<template>
  <Teleport to="body">
    <Transition name="search-overlay">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      >
        <div
          class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          aria-hidden="true"
          @click="close"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search artworks"
          class="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          @click.stop
        >
          <form
            class="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-700"
            @submit.prevent="submit"
          >
            <i
              class="fas fa-search text-purple-500 text-lg"
              aria-hidden="true"
            />
            <input
              ref="inputRef"
              v-model="query"
              type="search"
              placeholder="Search artworks, artists, categories..."
              class="flex-1 bg-transparent text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none"
              autocomplete="off"
            >
            <kbd class="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">Esc</kbd>
          </form>

          <div class="p-4">
            <p class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Quick links
            </p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="term in suggestions"
                :key="term"
                type="button"
                class="px-3 py-1.5 text-sm rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                @click="searchFor(term)"
              >
                {{ term }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  open: { type: Boolean, default: false }
});

const emit = defineEmits(['update:open']);

const router = useRouter();
const query = ref('');
const inputRef = ref(null);

const suggestions = ['Painting', 'Sculpture', 'Digital Art', 'Auctions'];

const close = () => emit('update:open', false);

const submit = () => {
  const q = query.value.trim();
  close();
  router.push({ path: '/search', query: q ? { q } : {} });
};

const searchFor = (term) => {
  query.value = term;
  submit();
};

const onKeydown = (e) => {
  if (e.key === 'Escape' && props.open) close();
};

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    query.value = '';
    await nextTick();
    inputRef.value?.focus();
  }
});

onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>

<style scoped>
.search-overlay-enter-active,
.search-overlay-leave-active {
  transition: opacity 0.2s ease;
}
.search-overlay-enter-from,
.search-overlay-leave-to {
  opacity: 0;
}
</style>
