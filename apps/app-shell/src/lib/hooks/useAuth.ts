import { useEffect } from 'react';

import { Auth } from '@/types/auth.type';
import { CartItem } from '@/types/cartItem.type';

import { isEmpty } from '../helpers/assertion';
import { clearCookie, getAccessTokenFromCookie } from '../helpers/auth';
import { useAuthStore } from '../zustand/useAuthStore';
import { useCartStore } from '../zustand/useCartStore';

type AuthState = {
  initialState?: {
    auth: Auth | null;
    cart: CartItem;
  };
};

function useAuth(props: AuthState) {
  const { initialState } = props;
  const { auth, cart } = initialState || {};

  const { setAuth } = useAuthStore(['setAuth']);
  const { setCart } = useCartStore(['setCart']);

  useEffect(() => {
    if (isEmpty(getAccessTokenFromCookie())) {
      clearCookie();
      return;
    }

    auth && setAuth(auth);
    cart && setCart(cart);
  }, [auth, cart]);

  // useEffect(() => {
  //   (async function unsubscribe() {
  //     const isLogined = !isEmpty(getAccessTokenFromCookie());

  //     if (!isLogined) {
  //       clearCookie();
  //       return;
  //     }

  //     try {
  //       const { AuthServices } = await import('../repo/auth.repo');
  //       const { CartServices } = await import('../repo/cart.repo');

  //       const { metadata } = await AuthServices.getProfile();

  //       if (!metadata) return;

  //       const cartItems = await CartServices.getCartItemsByIdAuth(metadata._id);

  //       setAuth(metadata);
  //       setCart(cartItems);
  //     } catch (error) {
  //       console.log('🚀 ~ file: useAuth.ts ~ line 57 ~ onAuthStateChanged ~ error', error);
  //       alert('Error when fetching user data');
  //     }
  //   })();
  // }, []);
}

export default useAuth;
