import Link from 'next/link';
import { useEffect } from 'react';

import Button from '@/components/shared/Button';
import { getResultPaymentFromUrl } from '@/lib/helpers/string';
import { useToast } from '@/lib/providers/toast-provider';

const PaymentUrlReturnPage = () => {
  const toast = useToast();

  useEffect(() => {
    if (!getResultPaymentFromUrl()) return;

    const handleCreateOrder = async () => {
      const OrderServices = await import('@/lib/repo/order.repo').then((res) => res.OrderServices);

      toast.promise(
        'Xử lí đơn hàng thành công',
        OrderServices.addOrder()
          .then(() => (window.location.href = '/'))
          .catch((err) => {
            console.log('🚀 ~ file: VNPayReturn.tsx ~ line 43 ~ err', err);
          }),
        'Xử lí đơn hàng thất bại'
      );
    };

    handleCreateOrder();
  }, []);

  return (
    <div className='vnpay-return'>
      {getResultPaymentFromUrl() ? (
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

export default PaymentUrlReturnPage;
