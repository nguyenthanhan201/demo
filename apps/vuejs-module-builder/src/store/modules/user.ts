import { StoreOptions } from 'vuex';
import { SET_USER } from '../types/user';

const userStore: StoreOptions<{
  user: {
    id: number;
    name: string;
    email: string;
  };
}> = {
  // state
  state: {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'abc@gmail.com'
    }

    // end state
  },

  // getters
  getters: {
    getUser(state) {
      return state.user;
    }

    // end getters
  },

  // mutations
  mutations: {
    [SET_USER](state, payload) {
      state.user = payload;
    }

    // end mutations
  },

  // actions
  actions: {
    // end action
  }
};

export default userStore;
