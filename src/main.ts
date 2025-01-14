import './assets/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import '../node_modules/flowbite-vue/dist/index.css';
import PrimeVue from 'primevue/config';

const app = createApp(App);
app.use(PrimeVue);
app.mount('#app');
