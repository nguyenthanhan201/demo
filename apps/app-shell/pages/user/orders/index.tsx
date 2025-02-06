import { GetServerSidePropsContext } from 'next';

import ManagerOrders from '@/components/index/user/components/ManagerOrders/ManagerOrders';
import UserLayout from '@/layouts/user-layout/UserLayout';
import { NextPageWithLayout } from '@/types/index';
import { Order } from '@/types/order.type';

const Page: NextPageWithLayout<{
  orders: Array<Order>;
}> = ({ orders }) => {
  return <ManagerOrders orders={orders} />;
};

export default Page;
Page.Layout = UserLayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { setContext } = await import('@/lib/axios/http');
  setContext(ctx);

  const { OrderServices } = await import('@/lib/repo/order.repo');
  const orders = await OrderServices.getOrdersByIdAuth().then((res) => {
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
