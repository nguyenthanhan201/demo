import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

import Img from '@/components/shared/Img/Img';
import { Brand } from '@/types/brand.type';

type BrandItemProps = ComponentPropsWithoutRef<'div'> & {
  brand: Brand;
};

const BrandItem = (props: BrandItemProps) => {
  const { brand, ...restProps } = props;

  return (
    <Link href={`brand/${brand._id}`} key={brand._id} prefetch={false}>
      <div {...restProps} className='flex flex-col justify-center items-center gap-2'>
        <Img alt={brand.name} height={200} src={brand.logo} width={200} />
        <p className='font-bold text-lg'>{brand.name}</p>
      </div>
    </Link>
  );
};

export default BrandItem;
