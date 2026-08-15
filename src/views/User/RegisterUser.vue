<template>
  <div class="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex">
    <!-- Brand panel -->
    <div class="hidden lg:flex lg:w-2/5 relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-32 -left-20 w-80 h-80 bg-yellow-200 rounded-full blur-3xl" />
        <div class="absolute bottom-10 right-0 w-72 h-72 bg-pink-400 rounded-full blur-3xl" />
      </div>
      <div class="relative z-10 flex flex-col justify-center p-12 text-white">
        <router-link
          to="/"
          class="absolute top-12 left-12 inline-flex flex-col leading-none no-underline group"
        >
          <span class="text-2xl font-black tracking-[0.15em]">KELEM</span>
          <span class="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-white/70">Online Art Gallery</span>
        </router-link>

        <h1 class="text-3xl xl:text-4xl font-bold leading-tight mb-4">
          Join our creative community
        </h1>
        <p class="text-white/80 leading-relaxed mb-8">
          Whether you're collecting masterpieces or showcasing your own work, KELEM is your home for art.
        </p>

        <ul class="space-y-4">
          <li
            v-for="feature in features"
            :key="feature"
            class="flex items-center gap-3 text-white/90"
          >
            <span class="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 shrink-0">
              <i class="fas fa-check text-xs" />
            </span>
            {{ feature }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Form panel -->
    <div class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 px-4 py-10 sm:px-8">
      <div class="max-w-2xl mx-auto">
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
              Create your account
            </h2>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start your art journey in minutes
            </p>
          </div>

          <form
            class="space-y-6"
            @submit.prevent="handleRegister"
          >
            <div
              v-if="errorMessage"
              class="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
            >
              <i class="fas fa-exclamation-circle shrink-0" />
              {{ errorMessage }}
            </div>

            <!-- Role selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">I want to join as</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="role in roleOptions"
                  :key="role.value"
                  type="button"
                  class="relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                  :class="formData.role === role.value
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'"
                  @click="formData.role = role.value"
                >
                  <i
                    :class="role.icon"
                    class="text-2xl"
                    :style="{ color: formData.role === role.value ? '#9333ea' : '#9ca3af' }"
                  />
                  <span class="font-semibold text-sm text-gray-900 dark:text-white">{{ role.label }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400 text-center">{{ role.desc }}</span>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <BaseInput
                v-model="formData.firstname"
                label="First Name"
                placeholder="John"
                :error="errors.firstname"
                required
              />
              <BaseInput
                v-model="formData.lastname"
                label="Last Name"
                placeholder="Doe"
                :error="errors.lastname"
                required
              />
            </div>

            <BaseInput
              v-model="formData.email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              :error="errors.email"
              required
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <BaseInput
                v-model="formData.phone"
                type="tel"
                label="Phone Number"
                placeholder="0912345678"
                :error="errors.phone"
                required
              />
              <BaseInput
                v-model="formData.age"
                type="number"
                label="Age"
                placeholder="18"
                :error="errors.age"
                required
              />
            </div>

            <BaseInput
              v-model="formData.address"
              label="Address"
              placeholder="Your address"
              :error="errors.address"
              required
            />

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <div class="flex gap-4">
                <label
                  v-for="option in ['female', 'male']"
                  :key="option"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all capitalize"
                  :class="formData.sex === option
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-purple-300'"
                >
                  <input
                    v-model="formData.sex"
                    type="radio"
                    :value="option"
                    class="sr-only"
                  >
                  {{ option }}
                </label>
              </div>
              <p
                v-if="errors.sex"
                class="mt-1 text-sm text-red-600"
              >
                {{ errors.sex }}
              </p>
            </div>

            <BaseInput
              v-model="formData.username"
              label="Username"
              placeholder="Choose a username"
              :error="errors.username"
              required
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <BaseInput
                v-model="formData.password"
                type="password"
                label="Password"
                placeholder="••••••••"
                :error="errors.password"
                hint="At least 8 characters, with upper, lower, and a number"
                required
              />
              <BaseInput
                v-model="formData.confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                :error="errors.confirmPassword"
                required
              />
            </div>

            <p class="text-xs text-center text-gray-500 dark:text-gray-400">
              By creating an account you agree to our
              <router-link
                to="/terms"
                class="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >Terms</router-link>
              and
              <router-link
                to="/privacy"
                class="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >Privacy Policy</router-link>.
            </p>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
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
                Creating account...
              </span>
              <span v-else>Create account</span>
            </button>

            <p class="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <router-link
                to="/userLogin"
                class="font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700"
              >
                Sign in
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';
import { useNotification } from '@/composables/useNotification';
import { BaseInput } from '@/components/common';
import { isStrongPassword } from '@/utils/security';

const router = useRouter();
const { success, error: showError } = useNotification();

const roleOptions = [
  { value: 'CUSTOMER', label: 'Collector', desc: 'Browse & purchase art', icon: 'fas fa-heart' },
  { value: 'ARTIST', label: 'Artist', desc: 'Sell & showcase work', icon: 'fas fa-palette' },
];

const features = [
  'Access exclusive auctions & collections',
  'Connect directly with artists',
  'Secure checkout & order tracking',
];

const formData = reactive({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
  sex: 'female',
  age: '',
  username: '',
  password: '',
  confirmPassword: '',
  role: 'CUSTOMER'
});

const errors = ref({});
const errorMessage = ref('');
const loading = ref(false);

const validateForm = () => {
  errors.value = {};

  if (!formData.firstname) errors.value.firstname = 'First name is required';
  if (!formData.lastname) errors.value.lastname = 'Last name is required';

  if (!formData.email) {
    errors.value.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.value.email = 'Invalid email address';
  }

  if (!formData.phone) {
    errors.value.phone = 'Phone number is required';
  } else if (!/^(09|07)\d{8}$/.test(formData.phone) && !/^\+2519\d{8}$/.test(formData.phone)) {
    errors.value.phone = 'Invalid phone number format';
  }

  if (!formData.address) errors.value.address = 'Address is required';

  if (!formData.age) {
    errors.value.age = 'Age is required';
  } else if (formData.age < 18) {
    errors.value.age = 'You must be at least 18 years old';
  }

  if (!formData.sex) errors.value.sex = 'Gender is required';
  if (!formData.username) errors.value.username = 'Username is required';

  if (!formData.password) {
    errors.value.password = 'Password is required';
  } else if (!isStrongPassword(formData.password)) {
    errors.value.password = 'Use 8+ characters with upper, lower, and a number';
  }

  if (!formData.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match';
  }

  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  loading.value = true;
  errorMessage.value = '';

  try {
    await authService.register(formData);
    success('Registration successful! Please check your email.');
    router.push('/signupSuccess');
  } catch (err) {
    errorMessage.value = err.response?.data?.message || err.message || 'Registration failed';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>
