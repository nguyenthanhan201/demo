import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { TEST_PAYMENT_LINKS } from '@/constants/index';
import { getSalePrice, numberWithCommans } from '@/lib/helpers/numbers';
import { useToast } from '@/lib/providers/toast-provider';
import { useCartStore } from '@/lib/zustand/useCartStore';
import { PaymentTypes } from '@/types/order.type';

import SelectPayment from './components/SelectPayment';

const DynamicCartItem = dynamic(() => import('@/components/index/cart/components/CartItem'));

const CartPage = () => {
  const toast = useToast();
  const { cart } = useCartStore(['cart']);
  const [paymentMethod, setPaymentMethod] = useState<PaymentTypes>('vnpay');

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
    return asArray.filter((item: any) => item[0].idProduct.deletedAt === null);
  }, [cart]);
  const totalPrice = useMemo(() => {
    let total = 0;
    if (!filteredCartItems) return total;
    Object.values(filteredCartItems).map((item: any) => {
      const quantity = item[0].quantity;

      // if product is on sale then use sale price else use price from product
      return (total += item[0].idProduct.discount
        ? getSalePrice(item[0].idProduct.price, item[0].idProduct.discount) * quantity
        : Number(item[0].idProduct.price) * quantity);
    });
    return total;
  }, [filteredCartItems]);

  const handleCreateOrder = async () => {
    const { OrderServices } = await import('@/lib/repo/order.repo');

    return OrderServices.createOrder(totalPrice, cart, paymentMethod)
      .then((res) => {
        console.log('👌  res:', res);
        window.location.href = res.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className='mb-3 cart'>
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
          <SelectPayment
            btnOrderProps={{
              onClick: handleCreateOrder,
              disabled: filteredCartItems.length === 0
            }}
            setValue={setPaymentMethod}
            value={paymentMethod}
          />
        </div>
      </div>
      <div className='cart_list'>
        {cart
          ? Object.values(cart).map((item, index) => (
              <DynamicCartItem
                color={item[0]?.color || ''}
                key={index}
                product={item[0]?.idProduct || ({} as any)}
                quantity={item[0]?.quantity || 0}
                size={item[0]?.size || ''}
              />
            ))
          : null}
        {TEST_PAYMENT_LINKS.map((item: any, index: number) => (
          <p className='text-red-500' key={index}>
            Lưu ý: vào link sau để lấy thông tin thanh toán {item.title}&nbsp;
            <Link className='text-blue-500' href={item.link} target='_blank'>
              {item.link} {item.note}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
