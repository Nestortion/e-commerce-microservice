// Original file: inventory.proto

import type { UpdateType as _inventory_UpdateType, UpdateType__Output as _inventory_UpdateType__Output } from '../inventory/UpdateType';

export interface UpdateRequest {
  'updateType'?: (_inventory_UpdateType);
  'productUUID'?: (string);
  'productQuantity'?: (number);
}

export interface UpdateRequest__Output {
  'updateType': (_inventory_UpdateType__Output);
  'productUUID': (string);
  'productQuantity': (number);
}
