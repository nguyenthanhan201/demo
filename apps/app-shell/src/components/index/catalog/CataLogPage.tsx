import { memo, useEffect, useState } from 'react';

import Grid from '@/components/shared/Grid';
import ProductCard from '@/components/shared/ProductCard';
import { Product } from '@/types/product.type';
import { productData } from '@/utils/index';

import CatalogFilter from './components/CatalogFilter';

export type FilterType = {
  category: string[];
  color: string[];
  size: string[];
  prices: number[][];
};

const initFilter = {
  category: [],
  color: [],
  size: [],
  prices: []
};

// const getProducts = async ({ pageParam: _pageParam = 0 }: QueryFunctionContext) => {
//   try {
//     return await fetch('http://localhost:3000/api/product', {
//       method: 'GET'
//     })
//       .then((res) => res.json())
//       .then((res) => res.data);
//   } catch (error) {
//     console.log(error);
//     return [];
//   }

//   // const res = await fetch(`https://api.realworld.io/api/articles?limit=10&offset=${pageParam}`);
//   // const data = await res.json();
//   // return { ...data, prevOffset: pageParam };
// };

const CatalogPage = () => {
  // const { isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
  //   ['catalogProducts'],
  //   ProductServices.getAll(),
  //   {
  //     onError: (error) => {
  //       alert(error);
  //     },
  //     onSuccess: (data) => {
  //       setProductList((prevState) => [...prevState, ...data.pages.at(0)]);
  //     },
  //     getNextPageParam: (lastPage, allPages) => {
  //       const lengths = [];
  //       for (const subArray of allPages) {
  //         lengths.push(subArray.length);
  //       }

  //       const sum = lengths.reduce((a, b) => a + b, 0);

  //       if (sum > 100) {
  //         return undefined;
  //       }

  //       return true;
  //     },
  //     refetchOnWindowFocus: false
  //   }
  // );

  const [productList] = useState<Array<Product>>(productData.getAllProducts() as Product[]);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [filter, setFilter] = useState<FilterType>(initFilter);
  // const listRef = useRef(null);

  // const rowVirtualizer = useVirtual({
  //   size: products.length,
  //   parentRef: listRef,
  //   estimateSize: useCallback(() => 35, []),
  //   overscan: 5
  // });

  useEffect(() => {
    (function updateProducts() {
      let temp = productList;

      if (filter.category.length > 0) {
        temp = temp.filter((e) => {
          const check = filter.category.find((category) => e.categorySlug === category);
          return check !== undefined;
        });
      }

      if (filter.color.length > 0) {
        temp = temp.filter((e) => {
          const check = e.colors.find((color: any) => filter.color.includes(color));
          return check !== undefined;
        });
      }

      if (filter.size.length > 0) {
        temp = temp.filter((e) => {
          const check = e.size.find((size: any) => filter.size.includes(size));
          return check !== undefined;
        });
      }

      if (filter.prices.length > 0) {
        temp = temp.filter((e) => {
          const check = filter.prices.find((price: any) => {
            return Number(e.price) >= price[0] && Number(e.price) <= price[1];
          });
          return check !== undefined;
        });
      }
      setProducts(temp);
    })();
  }, [filter, productList]);

  // const items = rowVirtualizer.virtualItems;
  // console.log(items);

  return (
    <div className='catalog'>
      <CatalogFilter filter={filter} setFilter={setFilter} />
      <div className='catalog_content'>
        <Grid col={3} gap={20} id='catalog-list-products' mdCol={2} smCol={1}>
          {/* {rowVirtualizer.virtualItems.map((virtualRow: any) => (
                  <div key={virtualRow.index} ref={rowVirtualizer.measure}>
                    <ProductCard product={products[virtualRow.index]} />
                  </div>
                ))} */}
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default memo(CatalogPage);

// {
//   isLoading ? (
//     <Loading />
//   ) : (
//     <div ref={listRef}>
//       <InfiniteScroll
//         dataLength={products.length}
//         hasMore={hasNextPage!}
//         loader={<>Loading...</>}
//         next={fetchNextPage}
//         // className='max-h-[100vh] overflow-auto'
//       >
//         <Grid col={3} gap={20} mdCol={2} smCol={1}>
//           {/* {rowVirtualizer.virtualItems.map((virtualRow: any) => (
//                   <div key={virtualRow.index} ref={rowVirtualizer.measure}>
//                     <ProductCard product={products[virtualRow.index]} />
//                   </div>
//                 ))} */}
//           {productList.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//         </Grid>
//       </InfiniteScroll>
//     </div>
//   );
// }
