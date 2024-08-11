import HomePage from '@/components/index/home/HomePage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { useSEO } from '@/lib/hooks/useSEO';
import { Brand } from '@/types/brand.type';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  brands: Array<Brand>;
}> = ({ brands }) => {
  return <HomePage brands={brands} />;
};
Page.Layout = DefaultLayout;
export default Page;
export async function getServerSideProps() {
  const BrandServices = await import('@/lib/repo/brand.repo').then((res) => res.BrandServices);
  // const ProductServices = await import('@/lib/repo/product.repo').then(
  //   (res) => res.ProductServices
  // );

  const res = await Promise.all([BrandServices.getAll()]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi', {
    description: 'Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi',
    image: '/images/Logo-2.png',
    keyword: 'yolo'
  });

  return {
    props: {
      brands: res[0].data,
      // products: res[1].data,
      seo
    }
  };
}

// return {
//   redirect: {
//     permanent: false,
//     destination: "/login",
//   },
//   props:{},
// };

// <!-- HTML Meta Tags -->
// <title>undefined</title>
// <meta name="description" content="undefined">

// <!-- Facebook Meta Tags -->
// <meta property="og:url" content="https://ecommerce-shop-fe.vercel.app/">
// <meta property="og:type" content="website">
// <meta property="og:title" content="undefined">
// <meta property="og:description" content="undefined">
// <meta property="og:image" content="">

// <!-- Twitter Meta Tags -->
// <meta name="twitter:card" content="summary_large_image">
// <meta property="twitter:domain" content="ecommerce-shop-fe.vercel.app">
// <meta property="twitter:url" content="https://ecommerce-shop-fe.vercel.app/">
// <meta name="twitter:title" content="undefined">
// <meta name="twitter:description" content="undefined">
// <meta name="twitter:image" content="">

// <!-- Meta Tags Generated via https://www.opengraph.xyz -->
