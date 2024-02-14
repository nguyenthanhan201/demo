import { GetServerSidePropsContext } from 'next';

import ManagerRating from '@/components/index/user/components/ManagerRating/ManagerRating';
import UserPlayout from '@/layouts/user-layout/UserPlayout';
import { RatingServices } from '@/lib/repo/rating.repo';
import { NextPageWithLayout } from '@/types/index';
import { Rating } from '@/types/rating.type';

const Page: NextPageWithLayout<{
  ratings: Array<Rating>;
}> = ({ ratings }) => {
  return <ManagerRating ratings={ratings} />;
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

  const ratings = await RatingServices.getRatingByIdAuth(userData._id).then((res) => {
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
