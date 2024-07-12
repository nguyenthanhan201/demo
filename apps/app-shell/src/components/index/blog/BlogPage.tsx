import { Blog } from '@/types/blog.type';

import BlogItem from './components/BlogItem/BlogItem';

const BlogPage = ({ blogs }: { blogs: Blog[] }) => {
  return (
    <div className='space-y-2'>
      {blogs.map((blog) => {
        return <BlogItem blog={blog} key={blog.id} />;
      })}
    </div>
  );
};

export default BlogPage;
