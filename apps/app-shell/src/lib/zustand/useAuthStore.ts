import { SetState } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';

import { Auth } from '../../types/auth.type';
import { createStoreWithSelectors } from '../helpers/zustand';

type AuthStore = {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
};

export const authStore = (set: SetState<AuthStore>) => ({
  auth: null,
  setAuth: (userData: Auth | null) => {
    set(() => ({
      auth: userData
    }));
  }
});

export const useAuthStore = createStoreWithSelectors(createWithEqualityFn<AuthStore>(authStore));
