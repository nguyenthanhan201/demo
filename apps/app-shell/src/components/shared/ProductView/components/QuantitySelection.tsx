import { Product } from '@/types/product.type';

import { ChoosenItemType } from '../ProductView';

type QuantitySelectionProps = {
  setChoosenItems: (choosenItems: ChoosenItemType) => void;
  choosenItems: ChoosenItemType;
  product: Product;
};

const QuantitySelection = (props: QuantitySelectionProps) => {
  const { setChoosenItems, choosenItems, product } = props;
  const { quantity } = choosenItems;

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

  return (
    <div className='product_info_item'>
      <div className='product_info_item_title'>
        {/* {t('quantity')} */}
        Quantity
      </div>
      <div className='product_info_item_quantity'>
        <div
          aria-disabled={quantity === 1 ? true : false}
          className='product_info_item_quantity_btn aria-disabled:pointer-events-none'
          onClick={() => updateQuantity('minus')}
          role='presentation'
        >
          -
        </div>
        <div className='product_info_item_quantity_input'>{quantity}</div>
        <div
          aria-disabled={quantity === Number(product.stock) ? true : false}
          className='product_info_item_quantity_btn aria-disabled:pointer-events-none'
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
  );
};

export default QuantitySelection;
