import HomePage from '@/components/index/home/HomePage';
import { UNLIMITED_PAGE_SIZE } from '@/constants/index';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { useSEO } from '@/lib/hooks/useSEO';
import { BrandServices } from '@/lib/repo/brand.repo';
import { ProductServices } from '@/lib/repo/product.repo';
import { Brand } from '@/types/brand.type';
import { NextPageWithLayout } from '@/types/index';
import { Product } from '@/types/product.type';

const Page: NextPageWithLayout<{
  brands: Array<Brand>;
  products: Array<Product>;
}> = ({ brands, products }) => {
  return <HomePage brands={brands} products={products} />;
};
Page.Layout = DefaultLayout;
export default Page;
export async function getServerSideProps() {
  // const BrandServices = await import('@/lib/repo/brand.repo').then((res) => res.BrandServices);
  // const ProductServices = await import('@/lib/repo/product.repo').then(
  //   (res) => res.ProductServices
  // );

  const res = await Promise.all([
    BrandServices.getAll(),
    // ProductServices.getAll(UNLIMITED_PAGE_SIZE).then((res) => res)
    ProductServices.getAll(UNLIMITED_PAGE_SIZE)
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi', {
    description: 'Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi',
    image: '/images/Logo-2.png',
    keyword: 'yolo'
  });

  return {
    props: {
      brands: res[0],
      // brands: [],
      products: res[1],
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
