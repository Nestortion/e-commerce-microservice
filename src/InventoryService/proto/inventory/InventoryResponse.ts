// Original file: inventory.proto

import type { InventoryData as _inventory_InventoryData, InventoryData__Output as _inventory_InventoryData__Output } from '../inventory/InventoryData';

export interface InventoryResponse {
  'inventoryId'?: (string);
  'inventoryData'?: (_inventory_InventoryData | null);
}

export interface InventoryResponse__Output {
  'inventoryId': (string);
  'inventoryData': (_inventory_InventoryData__Output | null);
}
