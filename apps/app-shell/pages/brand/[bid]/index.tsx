import { PreviewProps } from '@repo/shared-types';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useRef } from 'react';
import { mount } from 'vuejs_app/Preview';

import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { BrandServices } from '@/lib/repo/brand.repo';
import { Brand } from '@/types/brand.type';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  brand: Brand;
}> = ({ brand }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!brand.preview) return;

    mount(ref.current, {
      initPreview: brand.preview || ''
    } as PreviewProps);
  }, []);

  return <div id='app' ref={ref} />;
};

export default Page;
Page.Layout = DefaultLayout;

// export async function getStaticPaths() {
//   let res = await BrandServices.getAll(UNLIMITED_PAGE_SIZE);
//   console.log('👌  res:', res);

//   if (!res) {
//     res = { data: [] } as any;
//   }

//   const paths = res.data.map((post) => ({
//     params: { bid: String(post._id) }
//   }));

//   return { paths, fallback: false };
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await BrandServices.getOneBrand(context.params?.bid as string);

//   if (res.code === 'ERROR') return { notFound: true };

//   return { props: { brand: res.data }, revalidate: 86400 }; // 1 days
// };

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { bid } = ctx.params as { bid: string };
  const res = await BrandServices.getOneBrand(bid as string);

  if (res.code === 'ERROR') return;

  return {
    props: JSON.parse(
      JSON.stringify({
        brand: res.data
      })
    )
  };
};
