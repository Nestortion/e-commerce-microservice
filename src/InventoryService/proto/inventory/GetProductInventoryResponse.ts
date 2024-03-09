// Original file: inventory.proto

import type { Status as _inventory_Status, Status__Output as _inventory_Status__Output } from '../inventory/Status';

export interface GetProductInventoryResponse {
  'productQuantity'?: (number);
  'productStatus'?: (_inventory_Status);
}

export interface GetProductInventoryResponse__Output {
  'productQuantity': (number);
  'productStatus': (_inventory_Status__Output);
}
