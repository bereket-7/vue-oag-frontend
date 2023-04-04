//import Vue from 'vue'
//import { createApp } from 'vue'
//import App from './App.vue'
//import router from './router'
//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap"
//import '@fortawesome/fontawesome-free/js/all'
//import "carousel"
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//library.add(fas)
//const app = createApp(App)
//app.component('font-awesome-icon', FontAwesomeIcon)
//Vue.component('font-awesome-icon', FontAwesomeIcon)
//createApp(App).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "carousel"

createApp(App).use(router).mount('#app')