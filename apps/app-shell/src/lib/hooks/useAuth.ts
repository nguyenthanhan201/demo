import { useEffect } from 'react';

import { authentication } from '../../configs/firebase.config';
import { isEmpty } from '../helpers/assertion';
import { useToast } from '../providers/toast-provider';
import { AuthServices } from '../repo/auth.repo';
import { CartServices } from '../repo/cart.repo';
import { useAuthStore } from '../zustand/useAuthStore';
import { useCartStore } from '../zustand/useCartStore';
import { getCookie, removeCookie } from './useCookie';

function useAuth() {
  const toast = useToast();
  const { setAuth } = useAuthStore(['setAuth']);
  const { setCart } = useCartStore(['setCart']);

  const isLogined = !isEmpty(getCookie('token'));

  useEffect(() => {
    (async function unsubscribe() {
      const { onAuthStateChanged } = await import('firebase/auth');
      onAuthStateChanged(authentication, async (user) => {
        if (!user) {
          removeCookie('token');
          removeCookie('refreshToken');
          return;
        }

        try {
          const userData = await AuthServices.getUserByEmail(
            String(user.displayName),
            String(user.email)
          );
          const cartItems = await CartServices.getCartItemsByIdAuth(userData._id);

          setAuth({
            name: userData.name,
            email: userData.email,
            _id: userData._id
          });
          setCart(cartItems);
        } catch (error) {
          console.log('🚀 ~ file: useAuth.ts ~ line 57 ~ onAuthStateChanged ~ error', error);
          toast.error('Error when fetching user data');
        }
      });
    })();
  }, []);

  return {
    isLogined
  };
}

export default useAuth;
