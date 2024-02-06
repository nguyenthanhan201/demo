import { useSEO } from 'my-package';
import { NextPageContext } from 'next';

import ProductDetailPage from '@/components/index/product-detail/ProductDetailPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { RatingServices } from '@/lib/repo/rating.repo';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  query: any;
  ratings: any;
}> = ({ query, ratings }) => {
  return <ProductDetailPage product={query} ratings={ratings} />;
};

export default Page;
Page.Layout = DefaultLayout;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;

  const ratings = await RatingServices.getRatingByIdProduct(String(query._id)).then((res) => {
    if (res.code === 'SUCCESS') {
      return res.data;
    }

    return null;
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO(String(query.title), {
    description: String(query.description),
    image: String(query.image01),
    keyword: 'yolo'
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
        query,
        ratings
      })
    )
  };
};
