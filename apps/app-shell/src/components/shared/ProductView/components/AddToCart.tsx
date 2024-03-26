import { useRouter } from 'next/router';

import { refetchCart } from '@/lib/helpers/functions';
import { useToast } from '@/lib/providers/toast-provider';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useCartStore } from '@/lib/zustand/useCartStore';
import { Product } from '@/types/product.type';

import Button from '../../Button';
import { ChoosenItemType } from '../ProductView';

type AddToCartProps = {
  choosenItems: ChoosenItemType;
  product: Product;
  check: boolean;
};

const AddToCart = (props: AddToCartProps) => {
  const { choosenItems, product, check } = props;
  const router = useRouter();
  const { auth } = useAuthStore(['auth']);
  const toast = useToast();
  const { setCart } = useCartStore(['setCart']);

  const addToCart = async () => {
    if (!check) return;

    const CartServices = await import('@/lib/repo/cart.repo').then((res) => res.CartServices);

    const { color, size, quantity } = choosenItems;
    CartServices.createCartItem(auth!._id, product._id, size!, color!, quantity)
      .then((res) => {
        if (res) {
          // dispatch({ type: GET_CART_ITEMS, payload: auth!._id });
          refetchCart(auth!._id, (cartItems) => setCart(cartItems));
          toast.success('Thêm giỏ hàng thành công');
        }
      })
      .catch(() => {
        toast.error('Thêm giỏ hàng thất bại');
      });
  };

  const gotoCart = () => {
    if (check) router.push('/cart');
  };
  return (
    <div className='product_info_item'>
      <Button animate={false} icon='' onClick={addToCart}>
        {/* {t('add_to_cart')} */}
        Add to cart
      </Button>
      <Button animate={false} icon='' onClick={gotoCart}>
        {/* {t('buy_now')} */}
        Buy now
      </Button>
    </div>
  );
};

export default AddToCart;
