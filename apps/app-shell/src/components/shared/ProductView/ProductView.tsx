import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { getSalePrice, numberWithCommans, refetchCart } from '@/lib/helpers';
import { useDevice } from '@/lib/hooks/useDevice';
import { useToast } from '@/lib/providers/toast-provider';
import { CartServices } from '@/lib/repo/cart.repo';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { useCartStore } from '@/lib/zustand/useCartStore';
import { Product } from '@/types/product.type';
import { Rating } from '@/types/rating.type';

import Button from '../Button';
import Img from '../Img/Img';

const RatingMUI = dynamic(() => import('@mui/material/Rating'));
const ModalSeeComments = dynamic(() => import('./components/ModalSeeComments'));
const Modal = dynamic(() => import('../Modal/Modal'));
const ImagePreview = dynamic(() => import('./components/ImagePreview'));

type ProductViewProps = {
  product: Product;
  ratings?: Rating[];
};
type ChoosenItemType = {
  color: string | undefined;
  size: string | undefined;
  quantity: number;
};

const ProductView = ({ product, ratings }: ProductViewProps) => {
  const { isMobile } = useDevice();
  const toast = useToast();
  const { auth } = useAuthStore(['auth']);
  const { setCart } = useCartStore(['setCart']);
  const router = useRouter();
  const [previewImg, setReviewImg] = useState<string>(product.image01 || '');
  const [descriptionExpand, setDescriptionExpand] = useState<boolean>(false);
  const [choosenItems, setChoosenItems] = useState<ChoosenItemType>({
    color: undefined,
    size: undefined,
    quantity: 1
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const { color, size, quantity } = choosenItems;

  const ratingValue = useMemo(() => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, cur) => acc + cur.rating, 0);
    return sum / ratings.length;
  }, [ratings]);

  const updateQuantity = (types: any) => {
    if (types === 'plus') {
      if (product.stock == quantity) return;
      setChoosenItems({
        ...choosenItems,
        quantity: choosenItems.quantity + 1
      });
    } else {
      setChoosenItems({
        ...choosenItems,
        quantity: choosenItems.quantity - 1 < 1 ? 1 : choosenItems.quantity - 1
      });
    }
  };

  const check = () => {
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

  const addToCart = () => {
    if (!check()) return;
    const { color, size, quantity } = choosenItems;
    CartServices.createCartItem(auth!._id, product._id, size!, color!, quantity)
      .then((res) => {
        if (res) {
          // dispatch({ type: GET_CART_ITEMS, payload: auth!._id });
          refetchCart(auth!._id, (cartItems) => setCart(cartItems));
          toast.success('Thêm giỏ hàng thành công');
        }
      })
      .catch(() => {
        toast.error('Thêm giỏ hàng thất bại');
      });
  };

  const gotoCart = () => {
    if (check()) router.push('/cart');
  };

  const handleExpand = useCallback(() => {
    setDescriptionExpand((prev) => !prev);
  }, []);

  if (product === undefined) return null;
  return (
    <>
      <div className='product'>
        <div className='product_image'>
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
                <RatingMUI readOnly value={ratingValue} />
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
              <div className='product_info_item'>
                <div className='product_info_item_title'>
                  {/* {t('quantity')} */}
                  Quantity
                </div>
                <div className='product_info_item_quantity'>
                  <div
                    className='product_info_item_quantity_btn'
                    onClick={() => updateQuantity('minus')}
                    role='presentation'
                  >
                    -
                  </div>
                  <div className='product_info_item_quantity_input'>{quantity}</div>
                  <div
                    className='product_info_item_quantity_btn'
                    onClick={() => updateQuantity('plus')}
                    role='presentation'
                  >
                    +
                  </div>
                  <p className='stock'>
                    {/* {t('available')} */}
                    {product.stock}
                  </p>
                </div>
              </div>
              <div className='product_info_item'>
                <Button animate={false} icon='' onClick={addToCart}>
                  {/* {t('add_to_cart')} */}
                  Add to cart
                </Button>
                <Button animate={false} icon='' onClick={gotoCart}>
                  {/* {t('buy_now')} */}
                  Buy now
                </Button>
              </div>
            </>
          ) : (
            <p className='text-32 mt-6 text-red-500'>Hết hàng</p>
          )}
        </div>
        {isMobile ? (
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
        ) : null}
      </div>
      {showModal ? (
        <Modal handleClose={() => setShowModal(false)} open={showModal}>
          <ModalSeeComments ratings={ratings || []} />
        </Modal>
      ) : null}
    </>
  );
};
export default ProductView;
