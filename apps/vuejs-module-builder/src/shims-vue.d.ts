/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module '@vue/runtime-core' {
//   // declare your own store states
//   interface State {
//     count: number;
//   }

//   // provide typings for `this.$store`
//   interface ComponentCustomProperties {
//     $store: Store<State>;
//   }
// }
