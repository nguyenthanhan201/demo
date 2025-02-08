// import React from 'https://cdn.skypack.dev/react';
// import React from 'https://unpkg.com/browse/react@18.2.0';
// import { isEmpty } from 'https://cdn.skypack.dev/lodash';
// eslint-disable-next-line simple-import-sort/imports
import dynamic from 'next/dynamic';

import Grid from '@/components/shared/Grid';
import HeroSlider from '@/components/shared/HeroSlider';
import ProductCard from '@/components/shared/ProductCard';
import Section, { SectionBody, SectionTitle } from '@/components/shared/Section';
import { Brand } from '@/types/brand.type';
import { Product } from '@/types/product.type';
import heroSliderData from '@/utils/fake-data/hero-slider';
import BrandItem from './components/BrandItem';

const SlideBanner = dynamic(import('@/components/shared/SlideBanner'));

const HomePage = ({ brands, products }: { brands: Brand[]; products: Product[] }) => {
  // const [product, setProduct] = useState<Product[]>([]);
  // const [hasNextPage, setHasNextPage] = useState(true);
  // const [page, setPage] = useState(0);

  // const fetchNextPage = async () => {
  //   try {
  //     const res = await ProductServices.getAll({
  //       page: page + 1,
  //       pageSize: 4
  //     });

  //     if (page + 1 > res.totalPages) {
  //       setHasNextPage(false);
  //       return;
  //     }

  //     setProduct([...product, ...res.data]);
  //     setPage((prev) => prev + 1);
  //   } catch (error) {
  //     console.log(error);
  //     setHasNextPage(false);
  //   }
  // };

  return (
    <>
      <HeroSlider auto={false} control={true} data={heroSliderData} timeOut={1000} />
      <Section>
        <SectionTitle>các thương hiệu hợp tác</SectionTitle>
        <SectionBody>
          <Grid col={6} gap={20} id='list-brands' mdCol={2} smCol={1}>
            {brands.map((item) => (
              <BrandItem brand={item} key={item._id} />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* <Section>
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
      </Section> */}
      <Section>
        <SectionTitle>top sản phẩm bản chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} gap={20} mdCol={2} smCol={1}>
            {products.map((item: Product) => (
              <ProductCard key={item.title} product={item} />
            ))}
          </Grid>
          {/* <InfiniteScroll
            dataLength={product.length}
            hasMore={hasNextPage}
            loader={<Loading />}
            next={fetchNextPage}
          >
            <Grid col={4} gap={20} mdCol={2} smCol={1}>
              {product.map((item: Product) => (
                <ProductCard key={item.title} product={item} />
              ))}
            </Grid>
          </InfiniteScroll> */}
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
