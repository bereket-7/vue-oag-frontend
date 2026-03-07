<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 pt-24">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
        <p class="text-gray-600">We'd love to hear from you. Send us a message!</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {{ successMessage }}
            </div>

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

            <BaseInput
              v-model="formData.subject"
              label="Subject"
              placeholder="How can we help?"
              :error="errors.subject"
              required
            />

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="formData.message"
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Tell us more..."
                required
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
            </div>

            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="loading"
              full-width
            >
              <i class="fas fa-paper-plane mr-2"></i>
              Send Message
            </BaseButton>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-map-marker-alt text-blue-600"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Address</p>
                  <p class="text-gray-600">123 Art Street, Gallery District<br>City, State 12345</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-phone text-green-600"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Phone</p>
                  <p class="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-envelope text-purple-600"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Email</p>
                  <p class="text-gray-600">info@artgallery.com</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-clock text-yellow-600"></i>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Business Hours</p>
                  <p class="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM<br>Sat - Sun: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
            <div class="flex gap-4">
              <a href="#" class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white hover:bg-red-700 transition-colors">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useNotification } from '@/composables/useNotification';
import { BaseInput, BaseButton } from '@/components/common';
import api from '@/services/api';

const { success, error: showError } = useNotification();

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref({});
const loading = ref(false);
const successMessage = ref('');

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
    await api.post('/contact', formData);
    successMessage.value = 'Thank you! Your message has been sent successfully.';
    success('Message sent!');
    
    formData.name = '';
    formData.email = '';
    formData.subject = '';
    formData.message = '';
  } catch (err) {
    showError('Failed to send message. Please try again.');
  } finally {
    loading.value = false;
  }
};
</script>
