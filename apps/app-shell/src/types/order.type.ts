import { Product } from './product.type';

export type PaymentTypes = 'vnpay' | 'momo' | 'zalopay';

export type Order = {
  _id: string;
  idAuth: string;
  order: Record<string, Product[]>;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
