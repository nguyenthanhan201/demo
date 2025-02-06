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

  async addOrder() {
    const res = await post(`api/v1/order/add-order`);
    return res;
  }

  async getOrdersByIdAuth() {
    const res = await get(`api/v1/order/show`);
    return res;
  }
}
export const OrderServices = new OrderRepository();
