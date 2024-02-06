// import React from 'https://cdn.skypack.dev/react';
// import React from 'https://unpkg.com/browse/react@18.2.0';
// import { isEmpty } from 'https://cdn.skypack.dev/lodash';
import dynamic from 'next/dynamic';
import { memo } from 'react';

import Grid from '@/components/shared/Grid';
import HeroSlider from '@/components/shared/HeroSlider';
import PolicyCard from '@/components/shared/PolicyCard';
import Section, { SectionBody, SectionTitle } from '@/components/shared/Section';
import { Product } from '@/types/product.type';
import { heroSliderData, policy } from '@/utils/index';

const ProductCard = dynamic(import('@/components/shared/ProductCard'));
const SlideBanner = dynamic(import('@/components/shared/SlideBanner'));
const HomePage = ({ products }: { products: Product[] }) => {
  return (
    <>
      <HeroSlider auto={false} control={true} data={heroSliderData} timeOut={1000} />
      <Section>
        <SectionBody>
          <Grid col={4} gap={20} mdCol={2} smCol={1}>
            {policy.map((item, index) => (
              <PolicyCard
                description={item.description}
                icon={item.icon}
                key={index}
                name={item.name}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>top sản phẩm bản chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} gap={20} mdCol={2} smCol={1}>
            {products?.length > 0
              ? products.map((item: Product) => {
                  if (!item.image01) return null;
                  return <ProductCard key={item.title} product={item} />;
                })
              : null}
          </Grid>
        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          <SlideBanner />
        </SectionBody>
      </Section>
    </>
  );
};
export default memo(HomePage);
