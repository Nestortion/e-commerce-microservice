// Original file: inventory.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetProductInventoryRequest as _inventory_GetProductInventoryRequest, GetProductInventoryRequest__Output as _inventory_GetProductInventoryRequest__Output } from '../inventory/GetProductInventoryRequest';
import type { GetProductInventoryResponse as _inventory_GetProductInventoryResponse, GetProductInventoryResponse__Output as _inventory_GetProductInventoryResponse__Output } from '../inventory/GetProductInventoryResponse';
import type { InventoryRequest as _inventory_InventoryRequest, InventoryRequest__Output as _inventory_InventoryRequest__Output } from '../inventory/InventoryRequest';
import type { InventoryResponse as _inventory_InventoryResponse, InventoryResponse__Output as _inventory_InventoryResponse__Output } from '../inventory/InventoryResponse';
import type { UpdateRequest as _inventory_UpdateRequest, UpdateRequest__Output as _inventory_UpdateRequest__Output } from '../inventory/UpdateRequest';
import type { UpdateResponse as _inventory_UpdateResponse, UpdateResponse__Output as _inventory_UpdateResponse__Output } from '../inventory/UpdateResponse';

export interface InventoryServiceClient extends grpc.Client {
  addToInventory(argument: _inventory_InventoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  addToInventory(argument: _inventory_InventoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  addToInventory(argument: _inventory_InventoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  addToInventory(argument: _inventory_InventoryRequest, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  addToInventory(argument: _inventory_InventoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  addToInventory(argument: _inventory_InventoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  addToInventory(argument: _inventory_InventoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  addToInventory(argument: _inventory_InventoryRequest, callback: grpc.requestCallback<_inventory_InventoryResponse__Output>): grpc.ClientUnaryCall;
  
  getProductInventory(argument: _inventory_GetProductInventoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  getProductInventory(argument: _inventory_GetProductInventoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  getProductInventory(argument: _inventory_GetProductInventoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  getProductInventory(argument: _inventory_GetProductInventoryRequest, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  getProductInventory(argument: _inventory_GetProductInventoryRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  getProductInventory(argument: _inventory_GetProductInventoryRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  getProductInventory(argument: _inventory_GetProductInventoryRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  getProductInventory(argument: _inventory_GetProductInventoryRequest, callback: grpc.requestCallback<_inventory_GetProductInventoryResponse__Output>): grpc.ClientUnaryCall;
  
  updateInventory(argument: _inventory_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  updateInventory(argument: _inventory_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  updateInventory(argument: _inventory_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  updateInventory(argument: _inventory_UpdateRequest, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  updateInventory(argument: _inventory_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  updateInventory(argument: _inventory_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  updateInventory(argument: _inventory_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  updateInventory(argument: _inventory_UpdateRequest, callback: grpc.requestCallback<_inventory_UpdateResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface InventoryServiceHandlers extends grpc.UntypedServiceImplementation {
  addToInventory: grpc.handleUnaryCall<_inventory_InventoryRequest__Output, _inventory_InventoryResponse>;
  
  getProductInventory: grpc.handleUnaryCall<_inventory_GetProductInventoryRequest__Output, _inventory_GetProductInventoryResponse>;
  
  updateInventory: grpc.handleUnaryCall<_inventory_UpdateRequest__Output, _inventory_UpdateResponse>;
  
}

export interface InventoryServiceDefinition extends grpc.ServiceDefinition {
  addToInventory: MethodDefinition<_inventory_InventoryRequest, _inventory_InventoryResponse, _inventory_InventoryRequest__Output, _inventory_InventoryResponse__Output>
  getProductInventory: MethodDefinition<_inventory_GetProductInventoryRequest, _inventory_GetProductInventoryResponse, _inventory_GetProductInventoryRequest__Output, _inventory_GetProductInventoryResponse__Output>
  updateInventory: MethodDefinition<_inventory_UpdateRequest, _inventory_UpdateResponse, _inventory_UpdateRequest__Output, _inventory_UpdateResponse__Output>
}
