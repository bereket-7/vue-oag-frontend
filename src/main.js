import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeAuth } from '@/utils/auth';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "carousel";
import './assets/style.css';
import '@fortawesome/fontawesome-free/js/all';


initializeAuth(); 
createApp(App).use(router).mount('#app');
