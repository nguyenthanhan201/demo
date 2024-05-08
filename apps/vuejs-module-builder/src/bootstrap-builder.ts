import { App, createApp } from 'vue';
import store from './store';
// import './style.css';
import Designer from './views/designer/Designer.vue';

// Mount function to start up the app
const mount = async (el: any, rootProps: any) => {
  let app: App<Element> | null = null;

  // check if app has been mounted already
  if (el && el.__vue_app__ !== undefined) {
    // Set the existing mount point to 'app'.
    app = el.__vue_app__;

    app?.unmount(); // this a function from Vue.

    // create a new app instance
    app = createApp(Designer, rootProps);

    // Install the required instances like plugin, component and directive.
    app.use(store);

    // Mount 'app' (App.vue) as root component.
    app.mount(el); // this a function from Vue.
  } else {
    // create a new app instance
    app = createApp(Designer, rootProps);

    // Install the required instances like plugin, component and directive.
    app.use(store);

    // Mount 'app' (App.vue) as root component.
    app.mount(el); // this a function from Vue.
  }
};

// If we are in development and in isolation, call mount immediately
// if (process.env.NODE_ENV === 'development') {
//   const devRoot = document.querySelector('#_dashboard-dev-root');

//   if (devRoot) {
//     mount(devRoot, {});
//   }
// }

// We are running through container and we should export the mount function
export { mount };
