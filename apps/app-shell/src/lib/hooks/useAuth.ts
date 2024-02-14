import { useEffect } from 'react';

import { isEmpty } from '../helpers/assertion';
import { useAuthStore } from '../zustand/useAuthStore';
import { useCartStore } from '../zustand/useCartStore';
import { getCookie, removeCookie } from './useCookie';

function useAuth() {
  const { setAuth } = useAuthStore(['setAuth', 'auth']);
  const { setCart } = useCartStore(['setCart']);

  useEffect(() => {
    (async function unsubscribe() {
      const isLogined = !isEmpty(getCookie('token'));

      if (!isLogined) {
        removeCookie('token');
        removeCookie('refreshToken');
        return;
      }

      try {
        const { AuthServices } = await import('../repo/auth.repo');
        const { CartServices } = await import('../repo/cart.repo');

        const userData = await AuthServices.getProfile();

        if (!userData) return;

        const cartItems = await CartServices.getCartItemsByIdAuth(userData._id);

        setAuth(userData);
        setCart(cartItems);
      } catch (error) {
        console.log('🚀 ~ file: useAuth.ts ~ line 57 ~ onAuthStateChanged ~ error', error);
        alert('Error when fetching user data');
      }
    })();
  }, []);
}

export default useAuth;
