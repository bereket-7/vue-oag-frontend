<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-16 px-4">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div class="absolute bottom-0 left-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>
      <div class="relative max-w-3xl mx-auto text-center text-white">
        <p class="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
          {{ eyebrow }}
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
          {{ title }}
        </h1>
        <p class="text-lg text-white/80 max-w-xl mx-auto">
          {{ subtitle }}
        </p>
        <p class="mt-5 inline-flex items-center gap-2 text-sm text-white/70 bg-white/10 px-4 py-2 rounded-full">
          <i class="fas fa-calendar-alt" />
          Last updated {{ lastUpdated }}
        </p>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-12 -mt-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside class="lg:col-span-1 space-y-5 lg:sticky lg:top-24 self-start">
          <div class="page-card p-5">
            <h2 class="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
              On this page
            </h2>
            <nav class="space-y-1">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                class="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                <i
                  :class="section.icon"
                  class="w-4 text-center text-purple-500 text-xs"
                />
                {{ section.title }}
              </a>
            </nav>
          </div>

          <div class="page-card p-5">
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">
              {{ related.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {{ related.description }}
            </p>
            <router-link
              :to="related.to"
              class="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700"
            >
              {{ related.label }}
              <i class="fas fa-arrow-right text-xs" />
            </router-link>
          </div>
        </aside>

        <div class="lg:col-span-2 space-y-4">
          <article
            v-for="section in sections"
            :id="section.id"
            :key="section.id"
            class="page-card p-6 sm:p-8 scroll-mt-24"
          >
            <div class="flex items-start gap-4 mb-4">
              <span class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <i :class="section.icon" />
              </span>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white pt-1.5">
                {{ section.title }}
              </h2>
            </div>
            <div class="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              <p
                v-for="(paragraph, index) in section.paragraphs"
                :key="index"
              >
                {{ paragraph }}
              </p>
              <ul
                v-if="section.bullets"
                class="space-y-2 pt-1"
              >
                <li
                  v-for="item in section.bullets"
                  :key="item"
                  class="flex items-start gap-2"
                >
                  <i class="fas fa-check text-purple-500 mt-1 text-xs shrink-0" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </article>

          <div class="page-card p-6 bg-gradient-to-br from-purple-600 to-indigo-600 border-0 text-white">
            <i class="fas fa-headset text-2xl mb-3 opacity-80" />
            <h3 class="font-bold mb-1">
              Questions about this policy?
            </h3>
            <p class="text-sm text-white/80 mb-4">
              Our team can help with privacy, orders, and account questions.
            </p>
            <router-link
              to="/contactUs"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-purple-700 font-semibold text-sm hover:bg-purple-50 transition-colors"
            >
              Contact us
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  lastUpdated: { type: String, required: true },
  sections: { type: Array, required: true },
  related: { type: Object, required: true }
});
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
</style>
