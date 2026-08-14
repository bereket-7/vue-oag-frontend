<template>
  <div class="min-h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-950 transition-colors">
    <!-- Hero -->
    <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 py-16 px-4">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>
      <div class="relative max-w-4xl mx-auto text-center text-white">
        <p class="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
          Contact
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold mb-4">
          Get In Touch
        </h1>
        <p class="text-lg text-white/80 max-w-xl mx-auto">
          Have a question about an artwork, auction, or your account? We'd love to hear from you.
        </p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-12 -mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <!-- Form -->
        <div class="lg:col-span-3 page-card p-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Send us a message
          </h2>

          <form
            class="space-y-5"
            @submit.prevent="handleSubmit"
          >
            <div
              v-if="successMessage"
              class="alert-success"
            >
              <i class="fas fa-check-circle mr-2" />{{ successMessage }}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <BaseInput
                v-model="formData.name"
                label="Your Name"
                placeholder="John Doe"
                :error="errors.name"
                required
              />
              <BaseInput
                v-model="formData.email"
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                :error="errors.email"
                required
              />
            </div>

            <BaseInput
              v-model="formData.subject"
              label="Subject"
              placeholder="How can we help?"
              :error="errors.subject"
              required
            />

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message <span class="text-red-500">*</span></label>
              <textarea
                v-model="formData.message"
                rows="5"
                class="form-textarea"
                placeholder="Tell us more about your inquiry..."
                required
              />
              <p
                v-if="errors.message"
                class="mt-1 text-sm text-red-600"
              >
                {{ errors.message }}
              </p>
            </div>

            <button
              type="submit"
              class="btn-primary w-full sm:w-auto"
              :disabled="loading"
            >
              <i
                v-if="loading"
                class="fas fa-spinner fa-spin mr-2"
              />
              <i
                v-else
                class="fas fa-paper-plane mr-2"
              />
              Send Message
            </button>
          </form>
        </div>

        <!-- Info sidebar -->
        <div class="lg:col-span-2 space-y-5">
          <div class="page-card p-6">
            <h3 class="font-bold text-gray-900 dark:text-white mb-5">
              Contact Information
            </h3>
            <div class="space-y-4">
              <div
                v-for="info in contactInfo"
                :key="info.label"
                class="flex items-start gap-4"
              >
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  :class="info.bg"
                >
                  <i :class="[info.icon, info.color]" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-900 dark:text-white">
                    {{ info.label }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-line">
                    {{ info.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="page-card p-6">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">
              Follow Us
            </h3>
            <div class="flex gap-3">
              <a
                v-for="social in socials"
                :key="social.label"
                href="#"
                :aria-label="social.label"
                class="social-btn"
                :class="social.class"
              >
                <i :class="social.icon" />
              </a>
            </div>
          </div>

          <div class="page-card p-6 bg-gradient-to-br from-purple-600 to-indigo-600 border-0 text-white">
            <i class="fas fa-headset text-2xl mb-3 opacity-80" />
            <h3 class="font-bold mb-1">
              Need urgent help?
            </h3>
            <p class="text-sm text-white/80 mb-3">
              Our support team typically responds within 24 hours.
            </p>
            <a
              href="mailto:info@kelem.art"
              class="text-sm font-semibold underline underline-offset-2"
            >info@kelem.art</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useNotification } from '@/composables/useNotification';
import { BaseInput } from '@/components/common';

const { success, error: showError } = useNotification();

const formData = reactive({ name: '', email: '', subject: '', message: '' });
const errors = ref({});
const loading = ref(false);
const successMessage = ref('');

const contactInfo = [
  { label: 'Address', value: 'Bole Road, Addis Ababa\nEthiopia', icon: 'fas fa-map-marker-alt', bg: 'bg-purple-100 dark:bg-purple-900/40', color: 'text-purple-600 dark:text-purple-400' },
  { label: 'Phone', value: '+251 911 000 000', icon: 'fas fa-phone', bg: 'bg-green-100 dark:bg-green-900/40', color: 'text-green-600 dark:text-green-400' },
  { label: 'Email', value: 'info@kelem.art', icon: 'fas fa-envelope', bg: 'bg-blue-100 dark:bg-blue-900/40', color: 'text-blue-600 dark:text-blue-400' },
  { label: 'Hours', value: 'Mon–Fri: 9 AM – 6 PM\nSat: 10 AM – 4 PM', icon: 'fas fa-clock', bg: 'bg-amber-100 dark:bg-amber-900/40', color: 'text-amber-600 dark:text-amber-400' },
];

const socials = [
  { label: 'Facebook', icon: 'fab fa-facebook-f', class: 'bg-blue-600 hover:bg-blue-700' },
  { label: 'Twitter', icon: 'fab fa-twitter', class: 'bg-sky-500 hover:bg-sky-600' },
  { label: 'Instagram', icon: 'fab fa-instagram', class: 'bg-pink-600 hover:bg-pink-700' },
  { label: 'YouTube', icon: 'fab fa-youtube', class: 'bg-red-600 hover:bg-red-700' },
];

const validateForm = () => {
  errors.value = {};
  if (!formData.name) errors.value.name = 'Name is required';
  if (!formData.email) errors.value.email = 'Email is required';
  if (!formData.subject) errors.value.subject = 'Subject is required';
  if (!formData.message) errors.value.message = 'Message is required';
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  loading.value = true;
  successMessage.value = '';
  try {
    await new Promise((r) => setTimeout(r, 800));
    successMessage.value = 'Thank you! Your message has been sent. We\'ll get back to you soon.';
    success('Message sent!');
    Object.assign(formData, { name: '', email: '', subject: '', message: '' });
  } catch {
    showError('Failed to send message. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page-card { @apply bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm; }
.form-textarea { @apply w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all; }
.btn-primary { @apply inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 shadow-lg shadow-purple-500/20 transition-all; }
.alert-success { @apply flex items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm; }
.social-btn { @apply w-10 h-10 rounded-xl flex items-center justify-center text-white transition-colors; }
</style>
