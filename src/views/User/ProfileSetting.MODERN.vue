<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Picture -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6">
            <div class="text-center">
              <div class="relative inline-block">
                <img
                  :src="profileImage || 'https://via.placeholder.com/150'"
                  alt="Profile"
                  class="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <button
                  @click="$refs.profileImageInput.click()"
                  class="absolute bottom-4 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
                >
                  <i class="fas fa-camera"></i>
                </button>
                <input
                  ref="profileImageInput"
                  type="file"
                  accept="image/*"
                  @change="handleProfileImageChange"
                  class="hidden"
                />
              </div>
              <h3 class="font-semibold text-gray-900">{{ formData.firstname }} {{ formData.lastname }}</h3>
              <p class="text-sm text-gray-600">{{ formData.email }}</p>
            </div>
          </div>
        </div>

        <!-- Profile Form -->
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-md p-6 space-y-6">
            <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {{ errorMessage }}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BaseInput
                v-model="formData.firstname"
                label="First Name"
                :error="errors.firstname"
                required
              />
              
              <BaseInput
                v-model="formData.lastname"
                label="Last Name"
                :error="errors.lastname"
                required
              />
            </div>

            <BaseInput
              v-model="formData.email"
              type="email"
              label="Email Address"
              :error="errors.email"
              disabled
            />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BaseInput
                v-model="formData.phone"
                type="tel"
                label="Phone Number"
                :error="errors.phone"
              />
              
              <BaseInput
                v-model="formData.age"
                type="number"
                label="Age"
                :error="errors.age"
              />
            </div>

            <BaseInput
              v-model="formData.address"
              label="Address"
              :error="errors.address"
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
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                v-model="formData.bio"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div class="flex gap-3">
              <BaseButton
                type="submit"
                variant="primary"
                size="lg"
                :loading="loading"
              >
                Save Changes
              </BaseButton>
              <BaseButton
                type="button"
                variant="secondary"
                size="lg"
                @click="resetForm"
              >
                Reset
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, BaseButton } from '@/components/common';

const userStore = useUserStore();
const authStore = useAuthStore();
const { success, error: showError } = useNotification();

const profileImageInput = ref(null);
const profileImage = ref(null);
const loading = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const errors = ref({});

const formData = reactive({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  address: '',
  age: '',
  sex: 'female',
  bio: ''
});

const loadProfile = async () => {
  try {
    await userStore.fetchProfile();
    const profile = userStore.profile;
    if (profile) {
      Object.assign(formData, profile);
      profileImage.value = profile.profileImage;
    }
  } catch (err) {
    showError('Failed to load profile');
  }
};

const handleProfileImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const validateForm = () => {
  errors.value = {};
  
  if (!formData.firstname) errors.value.firstname = 'First name is required';
  if (!formData.lastname) errors.value.lastname = 'Last name is required';
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    await userStore.updateProfile(formData);
    authStore.updateUser(formData);
    successMessage.value = 'Profile updated successfully!';
    success('Profile updated!');
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Failed to update profile';
    showError(errorMessage.value);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  loadProfile();
  successMessage.value = '';
  errorMessage.value = '';
  errors.value = {};
};

onMounted(() => {
  loadProfile();
});
</script>
