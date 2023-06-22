//import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "carousel"
import './assets/style.css'
import '@fortawesome/fontawesome-free/js/all'
createApp(App).use(router).mount('#app');
