// Original file: inventory.proto

import type {
  Status as _inventory_Status,
  Status__Output as _inventory_Status__Output,
} from "../inventory/Status";

export interface InventoryData {
  quantity?: number;
  status?: _inventory_Status;
  productUUID?: string;
}

export interface InventoryData__Output {
  quantity: number;
  status: _inventory_Status__Output;
  productUUID: string;
}
