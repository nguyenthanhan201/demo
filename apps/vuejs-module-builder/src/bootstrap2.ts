import { createApp } from 'vue';
import CountVue from './components/CountVue.vue';

// Mount function to start up the app
const mount = (el: any) => {
  const app = createApp(CountVue);
  app.mount(el); // this a function from Vue.
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// We are running through container and we should export the mount function
export { mount };
