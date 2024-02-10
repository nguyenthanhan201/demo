import { NextPageContext } from 'next';

import HomePage from '@/components/index/home/HomePage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { useSEO } from '@/lib/hooks/useSEO';
import { NextPageWithLayout } from '@/types/index';
import { Product } from '@/types/product.type';

const Page: NextPageWithLayout<{
  products: Product[];
}> = ({ products }) => {
  return <HomePage products={products} />;
};
Page.Layout = DefaultLayout;
export default Page;
export async function getServerSideProps(_ctx: NextPageContext) {
  const ProductServices = await import('@/lib/repo/product.repo').then(
    (res) => res.ProductServices
  );
  // await queryClient.prefetchQuery('productsQuery', async () => await ProductServices.getAll());
  const products = await ProductServices.getAll();

  // const products = await ProductServices.getAll(true)
  //   .then((res) => {
  //     // console.log("👌 ~ res", res);
  //     return res;
  //   })
  //   .catch((err) => {
  //     // console.log("🚀 ~ err", err);
  //     return [];
  //   });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi', {
    description: 'Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi',
    image: '/images/Logo-2.png',
    keyword: 'yolo'
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
        products
        // dehydratedState: dehydrate(queryClient)
        // pageData: {
        //   products,
        // },
      })
    ) as PageProps<{ products: Product[] }>
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
