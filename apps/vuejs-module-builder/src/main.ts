import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './style.css';

const app = createApp(App);

// app.use(app);

app.use(store).mount('#app');
