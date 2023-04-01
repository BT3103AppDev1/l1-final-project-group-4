import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import PrimeVue from 'primevue/config';
import './assets/main.css'

const app = createApp(App)

app.use(router).use(store).use(PrimeVue)

app.mount('#app')
