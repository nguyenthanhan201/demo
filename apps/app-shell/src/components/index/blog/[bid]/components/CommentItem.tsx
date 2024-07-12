import Avatar from '@mui/material/Avatar';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { CommentTree } from '@/lib/helpers/functions';
import { differenceTime } from '@/lib/helpers/time';

type CommentItemProps = {
  comment: CommentTree;
  blogId: string;
};

const DynamicInputComment = dynamic(() => import('./InputComment'));

const CommentItem = (props: CommentItemProps) => {
  const { comment, blogId } = props;
  const [openComment, setOpenComment] = useState(false);

  const avatarSize = comment.parent_slug ? 24 : 32;

  return (
    <div>
      <div className='flex w-full gap-2'>
        <Avatar
          sx={{
            width: avatarSize,
            height: avatarSize
          }}
        >
          {comment.author[0]}
        </Avatar>
        <div className='w-full'>
          <p className='p-3 mt-1 flex flex-col bg-gray-500 rounded-2xl'>
            <span className='text-12 font-semibold'>
              {comment.author} - {comment.slug}
            </span>
            <span className='text-14 py-1'>{comment.text}</span>
          </p>
          <div className='space-x-3 text-12 ml-1 pt-1'>
            <span suppressHydrationWarning>{differenceTime(comment.createdAt)}</span>
            <span
              className='cursor-pointer font-bold'
              onClick={() => setOpenComment((prev) => !prev)}
            >
              Reply
            </span>
          </div>
          {openComment ? <DynamicInputComment blogId={blogId} comment={comment} /> : null}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
