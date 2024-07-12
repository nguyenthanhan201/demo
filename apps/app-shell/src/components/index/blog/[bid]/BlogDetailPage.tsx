import { useMemo } from 'react';

import Img from '@/components/shared/Img/Img';
import { SectionTitle } from '@/components/shared/Section';
import { buildCommentTree, CommentTree } from '@/lib/helpers/functions';
import { Blog } from '@/types/blog.type';
import { Comment } from '@/types/comment.type';

import CommentItem from './components/CommentItem';

const BlogDetailPage = ({ blog, comments }: { blog: Blog; comments: Comment[] }) => {
  const formattedComments = useMemo(() => {
    if (comments.length === 0) return [];

    return buildCommentTree(comments);
  }, [comments]);

  const renderListTree = (childComments: CommentTree[]) => {
    return (
      <ul
        className='pl-4 mt-4'
        style={{
          borderLeft: '2px solid #3A3B3C'
        }}
      >
        {childComments.map((comment) => {
          return (
            <li className='relative mt-4' key={comment.slug}>
              <div
                className='absolute w-4 right-full top-4'
                style={{
                  backgroundColor: '#3A3B3C',
                  height: '2px'
                }}
              />
              <CommentItem blogId={blog.id} comment={comment} />
              {comment.childComments.length > 0 ? renderListTree(comment.childComments) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <div className='flex gap-4'>
        <div className='relative aspect-video w-1/3'>
          <Img alt={blog.title} layout='fill' src={blog.thumbnail} />
        </div>
        <div>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
        </div>
      </div>
      <SectionTitle>Comments</SectionTitle>
      {formattedComments.length > 0 ? renderListTree(formattedComments) : <p>No comment</p>}
      {/* <InputComment blogId={blog.id} /> */}
    </div>
  );
};

export default BlogDetailPage;
