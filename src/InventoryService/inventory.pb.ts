import { Status } from "inventory";

import { InventoryData } from "inventory";

import { UpdateType } from "inventory";

//Service: InventoryService
export type addToInventory = (
  params: InventoryRequest
) => Promise<InventoryResponse>;

export type updateInventory = (
  params: UpdateRequest
) => Promise<UpdateResponse>;

export type getProductInventory = (
  params: GetProductInventoryRequest
) => Promise<GetProductInventoryResponse>;

export enum Status {
  DEPLETED = 1, //null
  WARNING = 2, //null
  GOOD = 3, //null
}

export enum UpdateType {
  DECREASE = 1, //null
  INCREASE = 2, //null
}

export interface GetProductInventoryRequest {
  productUUID: string;
}

export interface GetProductInventoryResponse {
  productQuantity: number;
  productStatus: Status;
}

export interface InventoryData {
  productId: string;
  quantity: string;
  status: Status;
  productUUID: string;
}

export interface InventoryRequest {
  productUUID: string;
}

export interface InventoryResponse {
  inventoryId: string;
  inventoryData: InventoryData;
}

export interface UpdateRequest {
  updateType: UpdateType;
  productUUID: string;
  productQuantity: string;
}

export interface UpdateResponse {
  message: string;
}
