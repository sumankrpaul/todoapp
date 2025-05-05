import { createApp } from 'vue'
import './style.css';
import "vue-toastification/dist/index.css";
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './routers';
import Toast from "vue-toastification";

const pinia = createPinia()
const options = {};
createApp(App).use(pinia).use(Toast, options).use(router).mount('#app');
