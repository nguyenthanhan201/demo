import { useSEO } from 'my-package';

import CatalogPage from '@/components/index/catalog/CataLogPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
const Page = () => {
  return <CatalogPage />;
};

export default Page;
Page.Layout = DefaultLayout;
export const getServerSideProps = async () => {
  // await queryClient.prefetchQuery(
  //   'productsCatalogQuery',
  //   async () => await ProductServices.getAll()
  // );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Danh sách sản phẩm');

  return {
    props: JSON.parse(
      JSON.stringify({
        seo
      })
    )
  };
};
