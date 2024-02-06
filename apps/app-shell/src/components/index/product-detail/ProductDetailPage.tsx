import ProductView from '@/components/shared/ProductView/ProductView';
import Section, { SectionBody } from '@/components/shared/Section';

const ProductDetailPage = ({ product, ratings }: any) => {
  return (
    <Section>
      <SectionBody>
        <ProductView product={product} ratings={ratings} />
      </SectionBody>
    </Section>
  );
};

export default ProductDetailPage;
