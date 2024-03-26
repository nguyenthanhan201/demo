import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout = () => {
  return <div>Post</div>;
};

export default Page;
Page.Layout = DefaultLayout;
