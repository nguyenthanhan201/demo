import { PaymentTypes } from '@/types/order.type';

import { get, post } from '../axios/http';
import { CrudRepository } from './crud.repo';

export class OrderRepository extends CrudRepository<any> {
  apiName = 'order';
  displayName = 'Order';

  async createOrder(amount: number, cartItems: any, paymentType: PaymentTypes) {
    const res = await post(`api/v1/order/payment-url`, {
      amount,
      cartItems,
      paymentType
    });
    return res;
  }

  async addOrder(idAuth: string) {
    const res = await post(`api/v1/order/add-order`, { idAuth });
    return res;
  }

  async getOrdersByIdAuth(idAuth: string) {
    const res = await get(`api/v1/order/show/${idAuth}`);
    return res;
  }
}
export const OrderServices = new OrderRepository();
