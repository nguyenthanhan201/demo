// import React from 'https://cdn.skypack.dev/react';
// import React from 'https://unpkg.com/browse/react@18.2.0';
// import { isEmpty } from 'https://cdn.skypack.dev/lodash';
// eslint-disable-next-line simple-import-sort/imports
import dynamic from 'next/dynamic';

import Grid from '@/components/shared/Grid';
import HeroSlider from '@/components/shared/HeroSlider';
import Img from '@/components/shared/Img/Img';
import PolicyCard from '@/components/shared/PolicyCard';
import ProductCard from '@/components/shared/ProductCard';
import Section, { SectionBody, SectionTitle } from '@/components/shared/Section';
import { Brand } from '@/types/brand.type';
import { Product } from '@/types/product.type';
import heroSliderData from '@/utils/fake-data/hero-slider';
import policy from '@/utils/fake-data/policy';
import Link from 'next/link';

const SlideBanner = dynamic(import('@/components/shared/SlideBanner'));

const HomePage = ({ brands, products }: { brands: Brand[]; products: Product[] }) => {
  return (
    <>
      <HeroSlider auto={false} control={true} data={heroSliderData} timeOut={1000} />
      <Section>
        <SectionTitle>các thương hiệu hợp tác</SectionTitle>
        <SectionBody>
          <Grid col={6} gap={20} mdCol={2} smCol={1}>
            {brands.map((item) => {
              return (
                <Link href={`brand/${item._id}`} key={item._id} prefetch={false}>
                  <Img alt={item.name} height={200} src={item.logo} width={200} />
                </Link>
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
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
export default HomePage;
