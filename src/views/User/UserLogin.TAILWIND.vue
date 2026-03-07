<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-4xl font-bold text-gray-900">Welcome Back</h2>
        <p class="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>
      
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ error }}
          </div>
          
          <BaseInput
            v-model="credentials.email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            required
            id="email"
          />
          
          <BaseInput
            v-model="credentials.password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
            id="password"
          />
          
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <router-link
              to="/forgotPassword"
              class="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </router-link>
          </div>
          
          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            full-width
          >
            Sign In
          </BaseButton>
        </form>
        
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>
          
          <div class="mt-6">
            <router-link to="/register">
              <BaseButton variant="outline" size="lg" full-width>
                Create Account
              </BaseButton>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { authService } from '@/services/authService';
import { useNotification } from '@/composables/useNotification';
import BaseInput from '@/components/common/BaseInput.vue';
import BaseButton from '@/components/common/BaseButton.vue';

const router = useRouter();
const authStore = useAuthStore();
const { success, error: showError } = useNotification();

const credentials = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await authService.login({
      username: credentials.value.email,
      password: credentials.value.password
    });

    const { accessToken, role } = response.data;
    
    authStore.setAuth(accessToken, response.data.user, role);
    
    success('Login successful!');

    const roleRoutes = {
      'ADMIN': '/adminDashboard',
      'CUSTOMER': '/customerDashboard',
      'ARTIST': '/artistDashboard',
      'MANAGER': '/managerDashboard',
      'ORGANIZATION': '/organizationDashboard'
    };

    router.push(roleRoutes[role] || '/');
  } catch (err) {
    error.value = err.response?.data?.message || 'Username or password incorrect';
    showError(error.value);
  } finally {
    loading.value = false;
  }
};
</script>
