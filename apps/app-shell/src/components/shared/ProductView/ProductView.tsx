import dynamic from 'next/dynamic';
import { useCallback, useMemo, useState } from 'react';

import { getSalePrice, numberWithCommans } from '@/lib/helpers/numbers';
import { useToast } from '@/lib/providers/toast-provider';
import { Product } from '@/types/product.type';
import { Rating as RatingType } from '@/types/rating.type';

import Button from '../Button';
import GalleryImage from './components/GalleryImage';

const DynamicRating = dynamic(() => import('./components/Rating'));
const ModalSeeComments = dynamic(() => import('./components/ModalSeeComments'), {
  ssr: false
});
const ImagePreview = dynamic(() => import('./components/ImagePreview'));
const DynamicQuantitySelection = dynamic(() => import('./components/QuantitySelection'));
const DynamicAddToCart = dynamic(() => import('./components/AddToCart'));

type ProductViewProps = {
  product: Product;
  ratings?: RatingType[];
};
export type ChoosenItemType = {
  color: string | undefined;
  size: string | undefined;
  quantity: number;
};

const ProductView = ({ product, ratings }: ProductViewProps) => {
  const toast = useToast();
  const [previewImg, setReviewImg] = useState<string>(product.image01 || '');
  const [descriptionExpand, setDescriptionExpand] = useState<boolean>(false);
  const [choosenItems, setChoosenItems] = useState<ChoosenItemType>({
    color: undefined,
    size: undefined,
    quantity: 1
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const { color, size } = choosenItems;

  const ratingValue = useMemo(() => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, cur) => acc + cur.rating, 0);
    return sum / ratings.length;
  }, [ratings]);

  const check = (): boolean => {
    const toastErr = (msg: string) => toast.error(msg);
    if (color === undefined) {
      toastErr('Vui lòng chọn màu!');
      return false;
    }
    if (size === undefined) {
      toastErr('Vui lòng chọn kích thước!');
      return false;
    }
    if (product._id === undefined) {
      toastErr('Sản phẩm không tồn tại!');
      return false;
    }
    return true;
  };

  const handleExpand = useCallback(() => {
    setDescriptionExpand((prev) => !prev);
  }, []);

  if (product === undefined) return null;
  return (
    <>
      <div className='product'>
        <div className='product_image'>
          <GalleryImage product={product} setReviewImg={setReviewImg} />
          {previewImg ? <ImagePreview previewImg={previewImg} /> : null}
          <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
            <div className='product-description_title'>Chi tiết sản phẩm</div>
            <div className='product-description_content'>
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: product.description || '' }} />
            </div>
            <div className='product-description_toggle'>
              <Button animate={false} icon='' onClick={handleExpand} size='sm'>
                {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
              </Button>
            </div>
            {!descriptionExpand ? <div className='gradient' /> : null}
          </div>
        </div>
        <div className='product_info'>
          <h1 className='product_info_title'>{product.title}</h1>
          <div className='flex items-start gap-2'>
            {ratings && ratings.length > 0 && ratings[0]?.rating !== 0 ? (
              <div
                className='flex cursor-pointer flex-col gap-1'
                onClick={() => setShowModal(true)}
                role='presentation'
              >
                <DynamicRating readOnly value={ratingValue} />
                <small className='text-[10px]'>Nhấn để xem đánh giá</small>
              </div>
            ) : (
              'Chưa có đánh giá'
            )}
            <p>{product.sold} đã bán</p>
          </div>
          <div className='product_info_item'>
            <div className='product_info_item_price'>
              {product.discount ? (
                <>
                  <p>{numberWithCommans(getSalePrice(product.price, product.discount))}</p>
                  <del>{numberWithCommans(Number(product.price))}</del>
                </>
              ) : (
                <p>{numberWithCommans(Number(product.price))}</p>
              )}
            </div>
          </div>
          <div className='product_info_item'>
            <div className='product_info_item_title'>
              {/* {t('color')} */}
              Color
            </div>
            <div className='product_info_item_list'>
              {product.colors.map((item: any, index: number) => (
                <div
                  className={`product_info_item_list_item ${color === item ? 'active' : ''}`}
                  key={index}
                  onClick={() => setChoosenItems({ ...choosenItems, color: item })}
                  role='presentation'
                >
                  <div className={`circle bg-${item}`} />
                </div>
              ))}
            </div>
          </div>
          <div className='product_info_item'>
            <div className='product_info_item_title'>
              {/* {t('size')} */}
              Size
            </div>
            <div className='product_info_item_list'>
              {product.size.map((item: any, index: number) => (
                <div
                  className={`product_info_item_list_item ${size === item ? 'active' : ''}`}
                  key={index}
                  onClick={() => setChoosenItems({ ...choosenItems, size: item })}
                  role='presentation'
                >
                  <div className='product_info_item_list_item_size'>{item}</div>
                </div>
              ))}
            </div>
          </div>
          {product.stock > 0 ? (
            <>
              <DynamicQuantitySelection
                choosenItems={choosenItems}
                product={product}
                setChoosenItems={setChoosenItems}
              />
              <DynamicAddToCart check={check} choosenItems={choosenItems} product={product} />
            </>
          ) : (
            <p className='text-32 mt-6 text-red-500'>Hết hàng</p>
          )}
        </div>
        {/* {isMobile ? (
          <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
            <div className='product-description_title'>Chi tiết sản phẩm</div>
            <div
              className='product-description_content'
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div className='product-description_toggle'>
              <Button animate={false} icon='' onClick={handleExpand} size='sm'>
                {descriptionExpand ? 'Thu gọn' : 'Xem thêm'}
              </Button>
            </div>
          </div>
        ) : null} */}
      </div>
      {showModal ? (
        <ModalSeeComments
          onClose={() => setShowModal(false)}
          open={showModal}
          ratings={ratings || []}
        />
      ) : null}
    </>
  );
};
export default ProductView;
