import { get, post } from '../axios/requests';

export class CartRepository {
  async createCartItem(
    idAuth: string,
    idProduct: string,
    size: string,
    color: string,
    quantity: number
  ) {
    const res = await post(`api/v1/cart-item/create`, {
      idAuth,
      idProduct,
      size,
      color,
      quantity
    });
    return res;
  }

  async deleteCartItem(idAuth: string, idProduct: string, size: string, color: string) {
    const res = await post(`api/v1/cart-item/delete`, {
      idAuth,
      idProduct,
      size,
      color
    });
    return res;
  }

  async getCartItemsByIdAuth(idAuth: string) {
    const res: any = await get(`api/v1/cart-item/${idAuth}`);
    return res.data;
  }

  async clearCartByIdAuth(idAuth: string) {
    const res = await post(`api/v1/cart-item/clear-cart`, { idAuth });
    return res;
  }
}
export const CartServices = new CartRepository();
