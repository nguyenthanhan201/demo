import { Comment } from '@/types/comment.type';

import { post } from '../axios/requests';
import { CrudRepository } from './crud.repo';

export class CommentRepository extends CrudRepository<Comment> {
  apiName = 'comment';
  displayName = 'Comments';

  // async getAllBrands<T>() {
  //   const res = await get<T>(`api/v1/brand/getAllBrands`);
  //   return res;
  // }

  async getAllComments({
    slug,
    parent_slug,
    discuss_id
  }: {
    slug?: string;
    parent_slug?: string;
    discuss_id?: string;
  }): Promise<Comment[]> {
    const match = {
      ...(discuss_id && { discuss_id }),
      ...(slug && { slug }),
      ...(parent_slug && { parent_slug })
    };
    const res = await post(`api/v1/comment/comments`, match);

    return res.metadata;
  }

  async createComment({
    discuss_id,
    text,
    parent_slug,
    slug,
    author
  }: {
    discuss_id: string;
    text: string;
    parent_slug: string;
    slug: string;
    author: string;
  }) {
    const res = await post(`api/v1/comment/put-comment`, {
      discuss_id,
      text,
      parent_slug,
      slug: slug.split('/').slice(-1)[0],
      author
    });
    return res;
  }
}
export const CommentServices = new CommentRepository();
