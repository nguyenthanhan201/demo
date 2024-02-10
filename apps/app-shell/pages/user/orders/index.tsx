import { GetServerSidePropsContext } from 'next';

import ManagerOrders from '@/components/index/user/components/ManagerOrders/ManagerOrders';
import UserPlayout from '@/layouts/user-layout/UserPlayout';
import { setContext } from '@/lib/axios/requests';
import { AuthServices } from '@/lib/repo/auth.repo';
import { OrderServices } from '@/lib/repo/order.repo';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  orders: Array<any>;
}> = ({ orders }) => {
  return <ManagerOrders orders={orders} />;
};

export default Page;
Page.Layout = UserPlayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  setContext(ctx);

  const userData = await AuthServices.getProfile();
  if (!userData) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }

  const orders = await OrderServices.getOrdersByIdAuth(userData._id).then((res) => {
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
