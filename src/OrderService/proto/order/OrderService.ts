// Original file: order.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateOrderRequest as _order_CreateOrderRequest, CreateOrderRequest__Output as _order_CreateOrderRequest__Output } from '../order/CreateOrderRequest';
import type { CreateOrderResponse as _order_CreateOrderResponse, CreateOrderResponse__Output as _order_CreateOrderResponse__Output } from '../order/CreateOrderResponse';

export interface OrderServiceClient extends grpc.Client {
  createOrder(argument: _order_CreateOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _order_CreateOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _order_CreateOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _order_CreateOrderRequest, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _order_CreateOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _order_CreateOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _order_CreateOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  createOrder(argument: _order_CreateOrderRequest, callback: grpc.requestCallback<_order_CreateOrderResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface OrderServiceHandlers extends grpc.UntypedServiceImplementation {
  createOrder: grpc.handleUnaryCall<_order_CreateOrderRequest__Output, _order_CreateOrderResponse>;
  
}

export interface OrderServiceDefinition extends grpc.ServiceDefinition {
  createOrder: MethodDefinition<_order_CreateOrderRequest, _order_CreateOrderResponse, _order_CreateOrderRequest__Output, _order_CreateOrderResponse__Output>
}
