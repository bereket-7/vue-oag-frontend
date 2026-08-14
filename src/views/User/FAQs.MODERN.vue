<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
    <!-- Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-16 px-4">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div class="absolute bottom-0 left-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>
      <div class="relative max-w-3xl mx-auto text-center text-white">
        <p class="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
          Help Center
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h1>
        <p class="text-lg text-white/80 max-w-xl mx-auto mb-8">
          Find answers about buying art, shipping, accounts, and how KELEM works.
        </p>

        <div class="relative max-w-xl mx-auto">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="search"
            type="search"
            placeholder="Search questions..."
            class="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/95 dark:bg-gray-900/90 text-gray-900 dark:text-white placeholder-gray-400 shadow-xl outline-none focus:ring-2 focus:ring-white/60"
            aria-label="Search FAQs"
          >
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 py-12 -mt-6">
      <!-- Categories -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all"
          :class="activeCategory === cat.id
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
            : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700'"
          @click="activeCategory = cat.id"
        >
          <i :class="cat.icon" />
          {{ cat.label }}
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Accordion -->
        <div class="lg:col-span-2 space-y-3">
          <div
            v-if="filteredFaqs.length === 0"
            class="page-card p-10 text-center"
          >
            <i class="fas fa-search text-3xl text-gray-300 dark:text-gray-600 mb-3" />
            <p class="font-semibold text-gray-900 dark:text-white">
              No matching questions
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Try another search, or contact our team.
            </p>
          </div>

          <div
            v-for="faq in filteredFaqs"
            :key="faq.id"
            class="page-card overflow-hidden"
          >
            <button
              type="button"
              class="w-full flex items-center gap-4 px-5 py-4 text-left"
              :aria-expanded="openId === faq.id"
              @click="toggle(faq.id)"
            >
              <span
                class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                :class="openId === faq.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'"
              >
                <i :class="faq.icon" />
              </span>
              <span class="flex-1 font-semibold text-gray-900 dark:text-white">
                {{ faq.question }}
              </span>
              <i
                class="fas fa-chevron-down text-gray-400 text-sm transition-transform"
                :class="{ 'rotate-180 text-purple-500': openId === faq.id }"
              />
            </button>
            <div
              v-show="openId === faq.id"
              class="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-gray-600 dark:text-gray-400"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-5">
          <div class="page-card p-6">
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">
              Still need help?
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Our team typically replies within 24 hours.
            </p>
            <router-link
              to="/contactUs"
              class="btn-primary w-full"
            >
              <i class="fas fa-envelope mr-2" />
              Contact us
            </router-link>
          </div>

          <div class="page-card p-6">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">
              Quick links
            </h3>
            <div class="space-y-2">
              <router-link
                v-for="link in quickLinks"
                :key="link.to"
                :to="link.to"
                class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
              >
                <i
                  :class="link.icon"
                  class="w-5 text-center text-purple-500"
                />
                {{ link.label }}
              </router-link>
            </div>
          </div>

          <div class="page-card p-6 bg-gradient-to-br from-purple-600 to-indigo-600 border-0 text-white">
            <i class="fas fa-map-marker-alt text-2xl mb-3 opacity-80" />
            <h3 class="font-bold mb-1">
              Visit the gallery
            </h3>
            <p class="text-sm text-white/80">
              Bole Sheger House, 3rd floor<br>
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const search = ref('');
const activeCategory = ref('all');
const openId = ref(1);

const categories = [
  { id: 'all', label: 'All', icon: 'fas fa-layer-group' },
  { id: 'buying', label: 'Buying', icon: 'fas fa-shopping-bag' },
  { id: 'shipping', label: 'Shipping', icon: 'fas fa-truck' },
  { id: 'account', label: 'Account', icon: 'fas fa-user' },
  { id: 'gallery', label: 'Gallery', icon: 'fas fa-palette' },
];

const faqs = [
  {
    id: 1,
    category: 'buying',
    icon: 'fas fa-shopping-bag',
    question: 'How do I purchase artwork from your gallery?',
    answer: 'Browse the gallery, open an artwork you love, and follow the checkout steps. You can pay securely online. If you need help choosing a piece or completing an order, contact us and a team member will assist you.',
  },
  {
    id: 2,
    category: 'buying',
    icon: 'fas fa-undo',
    question: 'Does your online art gallery offer returns?',
    answer: 'Yes. We offer 30-day returns on artwork purchased directly from our website. Contact us within 30 days of receiving your order with your reason for return and we will help you complete the process.',
  },
  {
    id: 3,
    category: 'shipping',
    icon: 'fas fa-truck',
    question: 'How is artwork shipped and what are the shipping costs?',
    answer: 'Artwork is carefully packaged and shipped with a trusted carrier. Shipping costs depend on size, weight, and destination, and are shown on each artwork page before you pay.',
  },
  {
    id: 4,
    category: 'gallery',
    icon: 'fas fa-expand',
    question: 'Do you offer custom framing for your artwork?',
    answer: 'Yes. Many artworks include custom framing options on the product page, with a range of frames and matting. For a specific request, reach out to our support team.',
  },
  {
    id: 5,
    category: 'account',
    icon: 'fas fa-user-plus',
    question: 'How do I sign up?',
    answer: 'Open Create account, choose Collector or Artist, then fill in your details. After you submit, check your email to activate your account and sign in.',
  },
  {
    id: 6,
    category: 'account',
    icon: 'fas fa-palette',
    question: 'How do I sell my artwork as an artist?',
    answer: 'Register as an Artist, complete your profile, then upload work from your dashboard. After review, approved pieces appear in the gallery, collections, and auctions.',
  },
  {
    id: 7,
    category: 'buying',
    icon: 'fas fa-gavel',
    question: 'How do auctions work?',
    answer: 'Open Auctions to see live lots. Sign in to place a bid. If you win, you will receive payment instructions and the artwork will be prepared for shipping or pickup.',
  },
  {
    id: 8,
    category: 'buying',
    icon: 'fas fa-credit-card',
    question: 'Which payment methods do you accept?',
    answer: 'We accept major cards and PayPal at checkout. Your payment is processed securely, and you will receive an order confirmation by email.',
  },
  {
    id: 9,
    category: 'gallery',
    icon: 'fas fa-map-marker-alt',
    question: 'Where are you located?',
    answer: 'We are located in Addis Ababa, Bole Sheger House, 3rd floor. You are welcome to visit during gallery hours or contact us to arrange an appointment.',
  },
];

const quickLinks = [
  { label: 'Browse gallery', icon: 'fas fa-images', to: '/artworkList' },
  { label: 'Live auctions', icon: 'fas fa-gavel', to: '/auctions' },
  { label: 'Privacy Policy', icon: 'fas fa-shield-alt', to: '/privacy' },
  { label: 'Terms and Conditions', icon: 'fas fa-file-contract', to: '/terms' },
];

const filteredFaqs = computed(() => {
  const q = search.value.trim().toLowerCase();
  return faqs.filter((faq) => {
    const matchesCategory = activeCategory.value === 'all' || faq.category === activeCategory.value;
    const matchesSearch = !q
      || faq.question.toLowerCase().includes(q)
      || faq.answer.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
});

const toggle = (id) => {
  openId.value = openId.value === id ? null : id;
};
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
.btn-primary { @apply inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/20 transition-all; }
</style>
