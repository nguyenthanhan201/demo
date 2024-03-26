import Link from 'next/link';
import { useEffect, useState } from 'react';

import Button from '@/components/shared/Button';
import { useToast } from '@/lib/providers/toast-provider';
import { OrderServices } from '@/lib/repo/order.repo';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useCartStore } from '@/lib/zustand/useCartStore';

const VNPayReturnPage = () => {
  const toast = useToast();
  // const auth = useAppSelector((state) => state.auth.auth);
  const [responseCode, setResponseCode] = useState<string>('');
  // const dispatch = useAppDispatch();
  const { auth } = useAuthStore(['auth']);
  const { setCart } = useCartStore(['setCart']);

  useEffect(() => {
    const query = window.location.search;
    const tempParams = JSON.parse(
      '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
      function (key, value) {
        return key === '' ? value : decodeURIComponent(value);
      }
    );
    setResponseCode(tempParams.vnp_ResponseCode);
  }, []);

  useEffect(() => {
    if (!auth || responseCode !== '00') return;
    toast.promise(
      'Xử lí đơn hàng thành công',
      OrderServices.addOrder(auth._id)
        .then(async () => {
          const refetchCart = await import('@/lib/helpers/functions').then(
            (res) => res.refetchCart
          );

          refetchCart(auth._id, setCart);
        })
        .catch((err) => {
          console.log('🚀 ~ file: VNPayReturn.tsx ~ line 43 ~ err', err);
        }),
      'Xử lí đơn hàng thất bại'
    );
  }, [auth?._id]);

  return (
    <div className='vnpay-return'>
      {responseCode === '00' ? (
        <p className='vnpay-return__text--success'>Thanh toán thành công</p>
      ) : (
        <p className='vnpay-return__text--error'>Thanh toán thất bại</p>
      )}
      <Button>
        <Link href='/'>Quay lại trang chủ</Link>
      </Button>
    </div>
  );
};

export default VNPayReturnPage;
