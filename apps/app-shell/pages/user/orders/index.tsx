import { GetServerSidePropsContext } from 'next';

import ManagerOrders from '@/components/index/user/components/ManagerOrders/ManagerOrders';
import UserPlayout from '@/layouts/user-layout/UserPlayout';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  orders: Array<any>;
}> = ({ orders }) => {
  return <ManagerOrders orders={orders} />;
};

export default Page;
Page.Layout = UserPlayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { setContext } = await import('@/lib/axios/requests');
  setContext(ctx);

  const { AuthServices } = await import('@/lib/repo/auth.repo');
  const userData = await AuthServices.getProfile();
  if (!userData) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  const { OrderServices } = await import('@/lib/repo/order.repo');
  const orders = await OrderServices.getOrdersByIdAuth(userData.metadata._id).then((res) => {
    if (res.code === 'ERROR') {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      };
    }

    return res.data;
  });

  return {
    props: {
      orders
    }
  };
}
