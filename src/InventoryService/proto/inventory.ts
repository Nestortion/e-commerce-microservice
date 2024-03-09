import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { InventoryServiceClient as _inventory_InventoryServiceClient, InventoryServiceDefinition as _inventory_InventoryServiceDefinition } from './inventory/InventoryService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  inventory: {
    GetProductInventoryRequest: MessageTypeDefinition
    GetProductInventoryResponse: MessageTypeDefinition
    InventoryData: MessageTypeDefinition
    InventoryRequest: MessageTypeDefinition
    InventoryResponse: MessageTypeDefinition
    InventoryService: SubtypeConstructor<typeof grpc.Client, _inventory_InventoryServiceClient> & { service: _inventory_InventoryServiceDefinition }
    Status: EnumTypeDefinition
    UpdateRequest: MessageTypeDefinition
    UpdateResponse: MessageTypeDefinition
    UpdateType: EnumTypeDefinition
  }
}

