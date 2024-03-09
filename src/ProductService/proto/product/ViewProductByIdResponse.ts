// Original file: product.proto

import type { ProductData as _product_ProductData, ProductData__Output as _product_ProductData__Output } from '../product/ProductData';

export interface ViewProductByIdResponse {
  'product'?: (_product_ProductData | null);
  'stocksLeft'?: (number);
  'stocksStatus'?: (string);
}

export interface ViewProductByIdResponse__Output {
  'product': (_product_ProductData__Output | null);
  'stocksLeft': (number);
  'stocksStatus': (string);
}
