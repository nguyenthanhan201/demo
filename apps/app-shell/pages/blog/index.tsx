import BlogPage from '@/components/index/blog/BlogPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { useSEO } from '@/lib/hooks/useSEO';
import { BlogServices } from '@/lib/repo/blog.repo';
import { Blog } from '@/types/blog.type';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  blogs: Blog[];
}> = ({ blogs }) => <BlogPage blogs={blogs} />;

export default Page;
Page.Layout = DefaultLayout;

export async function getServerSideProps() {
  const blogs = await BlogServices.getBlogs();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi', {
    description: 'Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi',
    image: '/images/Logo-2.png',
    keyword: 'yolo'
  });

  return {
    props: {
      blogs: blogs.metadata,
      seo
    }
  };
}
