import { Auth } from './auth.type';
import { Product } from './product.type';
export type CartItem = Record<
  string,
  Array<{
    idAuth: Auth;
    idProduct: Product;
    size: string;
    color: string;
    quantity: number;
  }>
>;
