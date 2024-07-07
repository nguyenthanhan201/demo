// eslint-disable-next-line simple-import-sort/imports
import { Brand } from '@/types/brand.type';
import { get, post, put } from '../axios/requests';

export class BrandRepository {
  async getAllBrands<T>() {
    const res = await get<T>(`api/v1/brand/getAllBrands`);
    return res;
  }

  async createBrand(data: Brand) {
    const res = await post(`api/v1/brand/create`, data);
    return res;
  }

  async getBrandsByUserId() {
    const res = await get(`api/v1/brand/getBrandsByUserId`);
    return res;
  }

  async updateBrand(data: { brandId: string; design: string; preview: never[] }) {
    const { brandId, design, preview } = data;
    console.log('👌  brandId:', brandId);
    const res = await put(`api/v1/brand/updateDesign`, {
      brandId,
      design,
      preview
    });
    return res;
  }

  async getOneBrand(brandId: string) {
    const res = await get<Brand>(`api/v1/brand/getOneBrand/${brandId}`);
    return res;
  }
}
export const BrandServices = new BrandRepository();
