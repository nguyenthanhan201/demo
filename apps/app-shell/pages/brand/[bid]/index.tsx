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

  return <div id='preview' ref={ref} />;
};

export default Page;
Page.Layout = DefaultLayout;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { bid } = ctx.params as any;
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
