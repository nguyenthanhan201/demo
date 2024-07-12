import Link from 'next/link';

import Img from '@/components/shared/Img/Img';
import { Blog } from '@/types/blog.type';

type BlogItemProps = {
  blog: Blog;
};

const BlogItem = (props: BlogItemProps) => {
  const { blog } = props;

  return (
    <div className='bg-gray-500 rounded flex'>
      <div className='relative w-1/6 h-auto'>
        <Img alt={blog.thumbnail} layout='fill' src={blog.thumbnail} />
      </div>
      <div className='p-4 w-full'>
        <p className='text-18 mb-2'>{blog.title}</p>
        <p className='text-16'>{blog.content || 'No content'}</p>
        <div className='flex justify-between mt-3'>
          <p>{new Date(blog.createdAt).toLocaleString()}</p>
          <Link href={`/blog/${blog.id}`} prefetch={false}>
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
