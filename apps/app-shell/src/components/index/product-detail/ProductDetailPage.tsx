import ProductView from '@/components/shared/ProductView/ProductView';
import Section, { SectionBody } from '@/components/shared/Section';
import { Product } from '@/types/product.type';
import { Rating } from '@/types/rating.type';

const ProductDetailPage = ({ product, ratings }: { product: Product; ratings: Rating[] }) => {
  return (
    <Section>
      <SectionBody>
        <ProductView product={product} ratings={ratings} />
      </SectionBody>
    </Section>
  );
};

export default ProductDetailPage;
