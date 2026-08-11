import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import './assets/tailwind.css';
import './assets/style.css';
import '@fortawesome/fontawesome-free/js/all';

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
