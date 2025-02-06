import { GetServerSidePropsContext } from 'next';

import ManagerRating from '@/components/index/user/components/ManagerRating/ManagerRating';
import UserLayout from '@/layouts/user-layout/UserLayout';
import { RatingServices } from '@/lib/repo/rating.repo';
import { NextPageWithLayout } from '@/types/index';
import { Rating } from '@/types/rating.type';

const Page: NextPageWithLayout<{
  ratings: Array<Rating>;
}> = ({ ratings }) => {
  return <ManagerRating ratings={ratings} />;
};

export default Page;
Page.Layout = UserLayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { setContext } = await import('@/lib/axios/http');
  setContext(ctx);

  const ratings = await RatingServices.getRatingByIdAuth().then((res) => {
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
      ratings: ratings
    }
  };
}
