import { DesignerProps } from '@repo/shared-types';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { mount } from 'vuejs_app/Builder';

import { BrandServices } from '@/lib/repo/brand.repo';
import { Brand } from '@/types/brand.type';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  brand: Brand;
}> = ({ brand }) => {
  const ref = useRef(null);

  const router = useRouter();
  const { bid } = router.query;

  useEffect(() => {
    const propFunc = async (design: string, preview: never[]) => {
      await BrandServices.updateBrand({
        brandId: bid as string,
        design,
        preview
      });
    };

    mount(ref.current, {
      design: brand.design,
      handleUpdateDataBrand: propFunc,
      brandId: bid
    } as DesignerProps);
  }, [bid]);

  return (
    <>
      <div ref={ref} />
    </>
  );
};

export default Page;

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
