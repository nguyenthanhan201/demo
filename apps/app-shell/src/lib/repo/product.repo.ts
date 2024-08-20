import { AxiosRequestConfig } from 'axios';

import { Product } from '../../types/product.type';
import { deleteReq, get, post, put } from '../axios/http';
import { CrudRepository } from './crud.repo';

export class ProductRepository extends CrudRepository<Product> {
  apiName = 'product';
  displayName = 'Products';

  async createProduct(product: Product) {
    const res = await post('api/v1/product/store', product);
    return res;
  }

  async updateProduct(product: Product) {
    const res = await put(`api/v1/product/${product._id}`, product);
    return res;
  }

  async hideProduct(id: string) {
    const res = await put(`api/v1/product/hide/${id}`);
    return res;
  }

  async unhideProduct(id: string) {
    const res = await put(`api/v1/product/unhide/${id}`);
    return res;
  }

  async deleteProduct(id: string) {
    const res = await deleteReq(`api/v1/product/${id}`);
    return res;
  }

  async getHideProducts(config?: AxiosRequestConfig<any> | undefined) {
    const res = await get<Product[]>(`api/v1/product/hide`, config);
    return res;
  }

  async getMostViewedProducts() {
    const res = await get<Product[]>(`api/v1/product/most-viewed`, {});
    return res;
  }

  async updateViewsProduct(idProduct: string) {
    const res = await put(`api/v1/product/most-viewed/${idProduct}`);
    return res;
  }
}
export const ProductServices = new ProductRepository();
