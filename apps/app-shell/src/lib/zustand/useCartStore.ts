import { SetState } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';

import { CartItem } from '@/types/cartItem.type';

import { createStoreWithSelectors } from '../helpers/zustand';

type CartStore = {
  cart: CartItem;
  setCart: (cart: CartItem) => void;
};

const cartStore = (set: SetState<CartStore>) => ({
  cart: {} as CartItem,
  setCart: (cartData: CartItem) => {
    set(() => ({
      cart: cartData
    }));
  }
});

export const useCartStore = createStoreWithSelectors(createWithEqualityFn<CartStore>(cartStore));
