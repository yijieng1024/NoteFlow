import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';

axios.defaults.baseURL = "https://noteflow-production-c250.up.railway.app"

createApp(App).mount('#app');