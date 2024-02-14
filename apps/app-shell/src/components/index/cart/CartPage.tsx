import Link from 'next/link';
import { useMemo } from 'react';

import CartItem from '@/components/index/cart/components/CartItem';
import Button from '@/components/shared/Button';
import { getSalePrice, numberWithCommans } from '@/lib/helpers/numbers';
import { useToast } from '@/lib/providers/toast-provider';
import { OrderServices } from '@/lib/repo/order.repo';
import { useCartStore } from '@/lib/zustand/useCartStore';
import { CartItem as CartItemType } from '@/types/cartItem.type';

const CartPage = () => {
  const toast = useToast();
  // const cartItems = useAppSelector((state) => state.cartItems.value);
  const { cart } = useCartStore(['cart']);
  const filteredCartItems = useMemo(() => {
    if (!cart) return [];

    if (Object.keys(cart).length === 0) return [];

    const asArray = Object.entries(cart).map(([key, value]) => {
      return {
        ...value,
        _id: key
      };
    });

    // filter out cart items with products are not hidden
    return asArray.filter((item) => item[0].idProduct.deletedAt === null);
  }, [cart]);
  const totalPrice = useMemo(() => {
    let total = 0;
    if (!filteredCartItems) return total;
    Object.values(filteredCartItems).map((item: [CartItemType]) => {
      const quantity = item[0].quantity;

      // if product is on sale then use sale price else use price from product
      return (total += item[0].idProduct.discount
        ? getSalePrice(item[0].idProduct.price, item[0].idProduct.discount) * quantity
        : Number(item[0].idProduct.price) * quantity);
    });
    return total;
  }, [filteredCartItems]);

  const handleCreateOrder = () => {
    if (filteredCartItems && filteredCartItems.length === 0)
      return toast.error('Giỏ hàng trống', { autoClose: 300 });
    return OrderServices.createOrder(totalPrice, cart)
      .then((res) => (window.location.href = res.data))
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className='cart mb-3'>
      <div className='cart_info'>
        <div className='cart_info_txt'>
          <p>
            Bạn đang có {filteredCartItems ? filteredCartItems.length : null} sản phẩm trong giỏ
            hàng
          </p>
          <div className='cart_info_txt_price'>
            <span>Thành tiền</span>
            <span>{numberWithCommans(totalPrice)}</span>
          </div>
        </div>
        <div className='cart_info_btn'>
          <Button onClick={handleCreateOrder} size='block'>
            đặt hàng
          </Button>
          <Link href='/'>
            <Button size='block'>tiếp tục mua hàng</Button>
          </Link>
        </div>
      </div>
      <div className='cart_list'>
        {cart
          ? Object.values(cart).map((item, index) => {
              // console.log("👌 ~ item", item);
              return (
                <CartItem
                  color={item[0].color}
                  key={index}
                  product={item[0].idProduct}
                  quantity={item[0].quantity}
                  size={item[0].size}
                />
              );
            })
          : null}
        <p className='text-red-500'>
          Lưu ý: vào link sau để lấy thông tin thanh toán&nbsp;
          <Link
            className='text-blue-500'
            href='https://sandbox.vnpayment.vn/apis/vnpay-demo/'
            target='_blank'
          >
            https://sandbox.vnpayment.vn/apis/vnpay-demo/
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CartPage;
