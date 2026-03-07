<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-4xl font-bold text-gray-900">Create Account</h2>
        <p class="mt-2 text-sm text-gray-600">Join Kelem Online Art Gallery</p>
      </div>

      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {{ errorMessage }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div class="flex gap-6">
              <label class="flex items-center">
                <input
                  v-model="formData.sex"
                  type="radio"
                  value="female"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span class="ml-2 text-gray-700">Female</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="formData.sex"
                  type="radio"
                  value="male"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span class="ml-2 text-gray-700">Male</span>
              </label>
            </div>
            <p v-if="errors.sex" class="mt-1 text-sm text-red-600">{{ errors.sex }}</p>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
            <select
              v-model="formData.role"
              id="role"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ARTIST">Artist</option>
            </select>
          </div>

          <BaseInput
            v-model="formData.username"
            label="Username"
            placeholder="Choose a username"
            :error="errors.username"
            required
          />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput
              v-model="formData.password"
              type="password"
              label="Password"
              placeholder="••••••••"
              :error="errors.password"
              hint="At least 6 characters"
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

          <p v-if="passwordError" class="text-sm text-red-600">{{ passwordError }}</p>

          <BaseButton
            type="submit"
            variant="primary"
            size="lg"
            :loading="loading"
            full-width
          >
            Create Account
          </BaseButton>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link to="/userLogin" class="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/services/authService';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, BaseButton } from '@/components/common';

const router = useRouter();
const { success, error: showError } = useNotification();

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
const passwordError = ref('');
const errorMessage = ref('');
const loading = ref(false);

const validateForm = () => {
  errors.value = {};
  passwordError.value = '';

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
  } else if (formData.password.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
  }

  if (!formData.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    passwordError.value = 'Passwords do not match';
  }

  return Object.keys(errors.value).length === 0 && !passwordError.value;
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
    errorMessage.value = err.response?.data?.message || 'Registration failed';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};
</script>
