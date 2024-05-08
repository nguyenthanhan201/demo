import { createApp } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import TestVue from './components/TestVue.vue';
// Mount function to start up the app
const mount = (el: any, rootProps: any) => {
  const app = createApp(TestVue, rootProps);
  console.log('👌  rootProps:', rootProps);
  app.mount(el); // this a function from Vue.
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot, {});
  }
}

// We are running through container and we should export the mount function
export { mount };
