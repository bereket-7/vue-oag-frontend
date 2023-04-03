//import Vue from 'vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
//Vue.component('font-awesome-icon', FontAwesomeIcon)
createApp(App).use(router).mount('#app')
