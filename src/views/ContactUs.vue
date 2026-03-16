<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="text-center" data-aos="fade-up">
          <h1 class="text-5xl font-bold mb-4">Get In Touch</h1>
          <p class="text-xl opacity-90">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg class="w-full h-12" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 48L1440 0V48H0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </div>

    <!-- Contact Content -->
    <div class="container mx-auto px-4 py-16">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-xl p-8" data-aos="fade-right">
          <h2 class="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          <form @submit="sendEmail" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input 
                  v-model="sender" 
                  type="text" 
                  name="name" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="John Doe" 
                  required
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                <input 
                  v-model="sender" 
                  type="email" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="john@example.com" 
                  required
                >
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input 
                v-model="subject" 
                type="text" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="How can we help?" 
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                v-model="message" 
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                rows="6" 
                placeholder="Tell us more about your inquiry..." 
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8" data-aos="fade-left">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4 group">
                <div class="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors duration-200">
                  <i class="fas fa-phone text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">Phone</h4>
                  <p class="text-gray-600">+251 943 578 915</p>
                  <p class="text-gray-600">+251 942 085 855</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 group">
                <div class="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors duration-200">
                  <i class="fas fa-envelope text-indigo-600 text-xl"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">Email</h4>
                  <p class="text-gray-600">kelem.oag.app@gmail.com</p>
                </div>
              </div>

              <div class="flex items-start space-x-4 group">
                <div class="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors duration-200">
                  <i class="fas fa-map-marker-alt text-green-600 text-xl"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800">Address</h4>
                  <p class="text-gray-600">Adama Science and Technology University (ASTU)</p>
                  <p class="text-gray-600">Adama, Ethiopia</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Follow Us</h3>
            <div class="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=100092538513954&mibextid=ZbWKwL" 
                class="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transform hover:scale-110 transition-all duration-200"
                target="_blank"
              >
                <i class="fab fa-facebook-f text-xl"></i>
              </a>
              <a 
                href="https://instagram.com/kelem_arts?igshid=ZDdkNTZiNTM=" 
                class="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transform hover:scale-110 transition-all duration-200"
                target="_blank"
              >
                <i class="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="#" 
                class="bg-sky-500 text-white p-3 rounded-lg hover:bg-sky-600 transform hover:scale-110 transition-all duration-200"
                target="_blank"
              >
                <i class="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer-view/>
</template>


<script>
import axios from 'axios';
import FooterView from "@/components/FooterView.vue";

export default {
  name: 'ContactUs',
  components: {
    FooterView
  },
  data() {
    return {
      recipient: 'kelem.oag.app@gmail.com',
      sender: '',
      subject: '',
      message: ''
    };
  },
  methods: {
    async sendEmail(event) {
      event.preventDefault();
      
      if (!this.sender || !this.subject || !this.message) {
        this.showNotification('Please fill in all required fields', 'error');
        return;
      }

      const emailDetail = {
        recipient: this.recipient,
        subject: this.subject,
        message: this.message,
        sender: this.sender,
        attachment: null 
      };

      try {
        await axios.post('http://localhost:8082/email/sendEmail', emailDetail);
        this.resetForm();
        this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      } catch (error) {
        console.error('Error sending email:', error);
        this.showNotification('Failed to send message. Please try again later.', 'error');
      }
    },
    resetForm() {
      this.sender = '';
      this.subject = '';
      this.message = '';
    },
    showNotification(message, type) {
      // Simple notification - you can replace with a toast library
      if (type === 'success') {
        alert(message);
      } else {
        alert(message);
      }
    }
  }
};
</script>

<style scoped>
/* Modern styles are handled by Tailwind CSS classes */
/* Add any custom animations or overrides here if needed */
</style>