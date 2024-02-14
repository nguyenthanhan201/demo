import { ShoppingCartOutlined as ShoppingCartOutlinedIcon } from '@repo/icons/src/ShoppingCartOutlined';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

import { getSalePrice, numberWithCommans } from '@/lib/helpers/numbers';
import { ProductServices } from '@/lib/repo/product.repo';
import { Product } from '@/types/product.type';

import Button from './Button';
import Img from './Img/Img';

const ProductViewModel = dynamic(() => import('./ProductViewModel'), {
  ssr: false
});

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  // const [sourceURL, setSourceURL] = useState(product.image01);
  const [open, setOpen] = useState(false);

  const handleIncreaseViewsProduct = () => {
    if (!product._id) return;
    ProductServices.updateViewsProduct(product._id);
  };

  return (
    <div className='product-card'>
      <div className='container-product-card'>
        {/* <ul className="thumb">
          {[product.image01, product.image02].map((child, index) => (
            <li className="child-shoes" key={index}>
              <div>
                <Img
                  src={child}
                  alt={child}
                  onClick={() => setSourceURL(child)}
                  loading="lazy"
                  layout="fill"
                />
              </div>
            </li>
          ))}
        </ul> */}
        <div className='imgBox'>
          <h2>{product.title}</h2>
          <Link
            className='shoess'
            href={{
              pathname: `/product-detail/${product.slug}`,
              query: {
                _id: product._id,
                title: product.title,
                stock: product.stock,
                image01: product.image01,
                image02: product.image02,
                price: product.price,
                slug: product.slug,
                size: product.size,
                categorySlug: product.categorySlug,
                colors: product.colors,
                description: product.description,
                discount: product.discount,
                sold: product.sold
              }
            }}
            onClick={handleIncreaseViewsProduct}
          >
            <Img
              alt={product.title}
              className='rounded-[20px]'
              layout='fill'
              src={product.image01}
            />
          </Link>
          <div className='size'>
            <span>Giá</span>
            {product.discount ? (
              <>
                <p>{numberWithCommans(getSalePrice(product.price, product.discount))}</p>
                <del>{numberWithCommans(Number(product.price))}</del>
              </>
            ) : (
              <p>{numberWithCommans(Number(product.price))}</p>
            )}
          </div>
          <Button
            animate={true}
            icon={<ShoppingCartOutlinedIcon fontSize='inherit' />}
            onClick={() => setOpen(true)}
            size='sm'
          >
            chọn mua
          </Button>
        </div>
      </div>
      {open ? <ProductViewModel open={open} product={product} setOpen={setOpen} /> : null}
    </div>
  );
};

export default ProductCard;
