import { memo } from 'react';

import { Product } from '@/types/product.type';

import Img from '../../Img/Img';

type GalleryImageProps = {
  product: Product;
  setReviewImg: (img: string) => void;
};

const GalleryImage = (props: GalleryImageProps) => {
  const { product, setReviewImg } = props;

  return (
    <div className='product_image_list'>
      {[product.image01, product.image02].map((child, index) => (
        <div
          className='product_image_list_item'
          key={index}
          onClick={() => setReviewImg(child)}
          role='presentation'
        >
          <Img alt={child} layout='fill' src={child} />
        </div>
      ))}
    </div>
  );
};

export default memo(GalleryImage);
