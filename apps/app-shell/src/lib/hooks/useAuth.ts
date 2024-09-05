import { useEffect } from 'react';

import { isEmpty } from '../helpers/assertion';
import { clearCookie, getAccessTokenFromCookie } from '../helpers/auth';
import { useAuthStore } from '../zustand/useAuthStore';
import { useCartStore } from '../zustand/useCartStore';

function useAuth() {
  const { setAuth } = useAuthStore(['setAuth']);
  const { setCart } = useCartStore(['setCart']);

  useEffect(() => {
    (async function unsubscribe() {
      const isLogined = !isEmpty(getAccessTokenFromCookie());

      if (!isLogined) {
        clearCookie();
        return;
      }

      try {
        const { AuthServices } = await import('../repo/auth.repo');
        const { CartServices } = await import('../repo/cart.repo');

        const { metadata } = await AuthServices.getProfile();

        if (!metadata) return;

        const cartItems = await CartServices.getCartItemsByIdAuth(metadata._id);

        setAuth(metadata);
        setCart(cartItems);
      } catch (error) {
        console.log('🚀 ~ file: useAuth.ts ~ line 57 ~ onAuthStateChanged ~ error', error);
        alert('Error when fetching user data');
      }
    })();
  }, []);
}

export default useAuth;
