import { Blog } from '@/types/blog.type';

import { get } from '../axios/http';
import { CrudRepository } from './crud.repo';

export class BlogRepository extends CrudRepository<any> {
  apiName = 'blog';
  displayName = 'Blogs';

  // async getAllBrands<T>() {
  //   const res = await get<T>(`api/v1/brand/getAllBrands`);
  //   return res;
  // }

  async getBlogs() {
    const res = await get<Blog[]>(`blog/v1`);

    if (res.code === 'ERROR') {
      throw res.error;
    }

    return res.data;
  }

  async getDetailBlog(id: string) {
    const res = await get<Blog>(`blog/v1/blog/${id}`);

    if (res.code === 'ERROR') {
      throw res.error;
    }

    return res.data;
  }
}
export const BlogServices = new BlogRepository();
