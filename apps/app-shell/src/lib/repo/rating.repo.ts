import { Rating } from '@/types/rating.type';

import { get, put } from '../axios/http';

export class RatingRepository {
  async getRatingByIdAuth() {
    const res = await get<Rating[]>(`api/v1/rating/getRatingByIdAuth`);
    return res;
  }
  async getRatingByIdProduct(idProduct: string) {
    const res = await get(`api/v1/rating/getRatingByIdProduct/${idProduct}`);
    return res;
  }
  async updateRatingById(idRating: string, rating: number, comment: string) {
    const res = await put(`api/v1/rating/updateRatingById/${idRating}`, {
      rating,
      comment
    });
    return res;
  }
}
export const RatingServices = new RatingRepository();
