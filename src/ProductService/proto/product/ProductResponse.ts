// Original file: product.proto

import type { ProductData as _product_ProductData, ProductData__Output as _product_ProductData__Output } from '../product/ProductData';

export interface ProductResponse {
  'productId'?: (number);
  'product'?: (_product_ProductData | null);
  'productUUID'?: (string);
}

export interface ProductResponse__Output {
  'productId': (number);
  'product': (_product_ProductData__Output | null);
  'productUUID': (string);
}
