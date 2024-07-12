import { GetServerSidePropsContext } from 'next';

import BlogDetailPage from '@/components/index/blog/[bid]/BlogDetailPage';
import DefaultLayout from '@/layouts/default-layout/DefaultLayout';
import { useSEO } from '@/lib/hooks/useSEO';
import { BlogServices } from '@/lib/repo/blog.repo';
import { Blog } from '@/types/blog.type';
import { Comment } from '@/types/comment.type';
import { NextPageWithLayout } from '@/types/index';

const Page: NextPageWithLayout<{
  blog: Blog;
  comments: Comment[];
}> = ({ blog, comments }) => <BlogDetailPage blog={blog} comments={comments} />;
export default Page;
Page.Layout = DefaultLayout;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { bid } = ctx.params as { bid: string };

  const CommentServices = await import('@/lib/repo/comment.repo').then(
    (res) => res.CommentServices
  );

  const results = await Promise.all([
    BlogServices.getDetailBlog(bid as string),
    CommentServices.getAllComments({
      discuss_id: bid
    })
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const seo = useSEO('Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi', {
    description: 'Dịch vụ đặt sản phẩm trực tuyến và giao hàng tận nơi',
    image: '/images/Logo-2.png',
    keyword: 'yolo'
  });

  return {
    props: {
      blog: results[0].metadata,
      comments: results[1],
      seo
    }
  };
}
