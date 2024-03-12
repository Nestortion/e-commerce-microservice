import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { OrderServiceClient as _order_OrderServiceClient, OrderServiceDefinition as _order_OrderServiceDefinition } from './order/OrderService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  order: {
    CreateOrderRequest: MessageTypeDefinition
    CreateOrderResponse: MessageTypeDefinition
    Order: MessageTypeDefinition
    OrderItem: MessageTypeDefinition
    OrderService: SubtypeConstructor<typeof grpc.Client, _order_OrderServiceClient> & { service: _order_OrderServiceDefinition }
    PaymentOption: EnumTypeDefinition
  }
}

