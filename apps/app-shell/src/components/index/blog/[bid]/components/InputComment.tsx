import { SendFilled } from '@repo/icons/src/SendFilled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { generateRandom8DigitNumber } from '@/lib/helpers/numbers';
import { useAuthStore } from '@/lib/zustand/useAuthStore';
import { Comment } from '@/types/comment.type';

type InputCommentProps = {
  blogId: string;
  comment?: Comment;
};

const InputComment = (props: InputCommentProps) => {
  const { blogId, comment } = props;
  const router = useRouter();

  const { auth } = useAuthStore(['auth']);
  const [commentValue, setCommentValue] = useState('');

  const handleCreateComment = async () => {
    if (!commentValue) return;

    const CommentServices = await import('@/lib/repo/comment.repo').then(
      (res) => res.CommentServices
    );

    await CommentServices.createComment({
      discuss_id: blogId,
      text: commentValue,
      parent_slug: comment?.slug || '',
      slug: generateRandom8DigitNumber().toString(),
      author: auth?.name || 'anonymous'
    }).then(() => {
      setCommentValue('');
      router.replace(router.asPath);
    });
  };

  return (
    <div className='flex gap-3 m-3'>
      <textarea
        className='w-full p-1'
        onChange={(e) => setCommentValue(e.target.value)}
        placeholder='comment moi'
        rows={2}
        value={commentValue}
      />
      <SendFilled
        className='cursor-pointer hover:text-myPrimaryLinkColor h-fit'
        onClick={handleCreateComment}
      />
    </div>
  );
};

export default InputComment;
