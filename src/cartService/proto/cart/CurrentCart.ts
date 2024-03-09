// Original file: cart.proto

import type { Product as _cart_Product, Product__Output as _cart_Product__Output } from '../cart/Product';

export interface CurrentCart {
  'productsInCart'?: (_cart_Product)[];
}

export interface CurrentCart__Output {
  'productsInCart': (_cart_Product__Output)[];
}
