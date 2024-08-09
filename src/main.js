import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Importaciones axios
import axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
