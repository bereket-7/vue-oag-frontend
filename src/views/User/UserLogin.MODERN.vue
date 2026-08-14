<template>
  <div class="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex">
    <!-- Brand panel -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
      </div>
      <div class="relative z-10 flex flex-col justify-between p-12 text-white w-full">
        <router-link
          to="/"
          class="inline-flex flex-col leading-none no-underline group"
        >
          <span class="text-2xl font-black tracking-[0.15em]">KELEM</span>
          <span class="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">Online Art Gallery</span>
        </router-link>

        <div>
          <h1 class="text-4xl xl:text-5xl font-bold leading-tight mb-4">
            Discover art<br>that moves you
          </h1>
          <p class="text-lg text-white/80 max-w-md">
            Browse curated collections, bid on exclusive auctions, and connect with talented artists worldwide.
          </p>
        </div>

        <div class="flex gap-8 text-sm text-white/70">
          <div>
            <p class="text-2xl font-bold text-white">
              2k+
            </p>
            <p>Artworks</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">
              500+
            </p>
            <p>Artists</p>
          </div>
          <div>
            <p class="text-2xl font-bold text-white">
              50+
            </p>
            <p>Auctions</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form panel -->
    <div class="flex-1 flex items-center justify-center px-4 py-10 sm:px-8 bg-gray-50 dark:bg-gray-950">
      <div class="w-full max-w-md">
        <div class="lg:hidden text-center mb-8">
          <router-link
            to="/"
            class="inline-flex flex-col leading-none no-underline"
          >
            <span class="text-2xl font-black tracking-[0.15em] bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">KELEM</span>
          </router-link>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-purple-500/5 dark:shadow-none border border-gray-100 dark:border-gray-800 p-8 sm:p-10">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Sign in to continue to your account
            </p>
          </div>

          <div
            v-if="isMock"
            class="mb-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50"
          >
            <p class="text-xs font-medium text-amber-800 dark:text-amber-300">
              Mock mode is on. Use local demo accounts from the project docs — not for production.
            </p>
          </div>

          <form
            class="space-y-5"
            @submit.prevent="handleLogin"
          >
            <div
              v-if="error"
              class="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
            >
              <i class="fas fa-exclamation-circle shrink-0" />
              {{ error }}
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
              >Email or username</label>
              <div class="relative">
                <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="email"
                  v-model="credentials.email"
                  type="text"
                  placeholder="you@example.com"
                  required
                  autocomplete="username"
                  class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Password</label>
                <router-link
                  to="/forgotPassword"
                  class="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Forgot password?
                </router-link>
              </div>
              <div class="relative">
                <i class="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  id="password"
                  v-model="credentials.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  required
                  autocomplete="current-password"
                  class="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                >
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click="showPassword = !showPassword"
                >
                  <i
                    :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                    class="text-sm"
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5"
            >
              <span
                v-if="loading"
                class="inline-flex items-center gap-2"
              >
                <svg
                  class="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </span>
              <span v-else>Sign in</span>
            </button>
          </form>

          <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?
            <router-link
              to="/register"
              class="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              Create one free
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { isMockMode } from '@/services/adapters';
import { getSafeInternalPath } from '@/utils/security';

const route = useRoute();
const router = useRouter();
const { login, redirectByRole } = useAuth();

const credentials = ref({ email: '', password: '' });
const loading = ref(false);
const error = ref('');
const showPassword = ref(false);
const isMock = isMockMode();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  const result = await login({
    username: credentials.value.email,
    password: credentials.value.password
  });
  if (result.success) {
    const redirect = getSafeInternalPath(route.query.redirect, '');
    if (redirect) {
      router.replace(redirect);
    } else {
      redirectByRole();
    }
  } else {
    error.value = result.error || 'Invalid email or password';
  }
  loading.value = false;
};
</script>
