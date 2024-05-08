import { createStore } from 'vuex';
import designer from './modules/designer';
import unsplash from './modules/unsplash';
import user from './modules/user';

const store = createStore({
  modules: {
    user: user,
    designer: designer,
    unsplash: unsplash
  }
});

export default store;
