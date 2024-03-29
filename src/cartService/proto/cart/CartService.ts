// Original file: cart.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CartRequest as _cart_CartRequest, CartRequest__Output as _cart_CartRequest__Output } from '../cart/CartRequest';
import type { CurrentCart as _cart_CurrentCart, CurrentCart__Output as _cart_CurrentCart__Output } from '../cart/CurrentCart';
import type { EmptyCartRequest as _cart_EmptyCartRequest, EmptyCartRequest__Output as _cart_EmptyCartRequest__Output } from '../cart/EmptyCartRequest';
import type { EmptyCartResponse as _cart_EmptyCartResponse, EmptyCartResponse__Output as _cart_EmptyCartResponse__Output } from '../cart/EmptyCartResponse';
import type { Product as _cart_Product, Product__Output as _cart_Product__Output } from '../cart/Product';
import type { RemoveCartItemRequest as _cart_RemoveCartItemRequest, RemoveCartItemRequest__Output as _cart_RemoveCartItemRequest__Output } from '../cart/RemoveCartItemRequest';
import type { RemoveCartItemResponse as _cart_RemoveCartItemResponse, RemoveCartItemResponse__Output as _cart_RemoveCartItemResponse__Output } from '../cart/RemoveCartItemResponse';
import type { UpdateCartItemQuantityRequest as _cart_UpdateCartItemQuantityRequest, UpdateCartItemQuantityRequest__Output as _cart_UpdateCartItemQuantityRequest__Output } from '../cart/UpdateCartItemQuantityRequest';
import type { UpdateCartItemQuantityResponse as _cart_UpdateCartItemQuantityResponse, UpdateCartItemQuantityResponse__Output as _cart_UpdateCartItemQuantityResponse__Output } from '../cart/UpdateCartItemQuantityResponse';
import type { ViewCartRequest as _cart_ViewCartRequest, ViewCartRequest__Output as _cart_ViewCartRequest__Output } from '../cart/ViewCartRequest';

export interface CartServiceClient extends grpc.Client {
  addToCart(argument: _cart_CartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  addToCart(argument: _cart_CartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  addToCart(argument: _cart_CartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  addToCart(argument: _cart_CartRequest, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  addToCart(argument: _cart_CartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  addToCart(argument: _cart_CartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  addToCart(argument: _cart_CartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  addToCart(argument: _cart_CartRequest, callback: grpc.requestCallback<_cart_Product__Output>): grpc.ClientUnaryCall;
  
  emptyCart(argument: _cart_EmptyCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _cart_EmptyCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _cart_EmptyCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _cart_EmptyCartRequest, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _cart_EmptyCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _cart_EmptyCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _cart_EmptyCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  emptyCart(argument: _cart_EmptyCartRequest, callback: grpc.requestCallback<_cart_EmptyCartResponse__Output>): grpc.ClientUnaryCall;
  
  removeCartItem(argument: _cart_RemoveCartItemRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  removeCartItem(argument: _cart_RemoveCartItemRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  removeCartItem(argument: _cart_RemoveCartItemRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  removeCartItem(argument: _cart_RemoveCartItemRequest, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  removeCartItem(argument: _cart_RemoveCartItemRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  removeCartItem(argument: _cart_RemoveCartItemRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  removeCartItem(argument: _cart_RemoveCartItemRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  removeCartItem(argument: _cart_RemoveCartItemRequest, callback: grpc.requestCallback<_cart_RemoveCartItemResponse__Output>): grpc.ClientUnaryCall;
  
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  updateCartItemQuantity(argument: _cart_UpdateCartItemQuantityRequest, callback: grpc.requestCallback<_cart_UpdateCartItemQuantityResponse__Output>): grpc.ClientUnaryCall;
  
  viewCart(argument: _cart_ViewCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  viewCart(argument: _cart_ViewCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  viewCart(argument: _cart_ViewCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  viewCart(argument: _cart_ViewCartRequest, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  viewCart(argument: _cart_ViewCartRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  viewCart(argument: _cart_ViewCartRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  viewCart(argument: _cart_ViewCartRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  viewCart(argument: _cart_ViewCartRequest, callback: grpc.requestCallback<_cart_CurrentCart__Output>): grpc.ClientUnaryCall;
  
}

export interface CartServiceHandlers extends grpc.UntypedServiceImplementation {
  addToCart: grpc.handleUnaryCall<_cart_CartRequest__Output, _cart_Product>;
  
  emptyCart: grpc.handleUnaryCall<_cart_EmptyCartRequest__Output, _cart_EmptyCartResponse>;
  
  removeCartItem: grpc.handleUnaryCall<_cart_RemoveCartItemRequest__Output, _cart_RemoveCartItemResponse>;
  
  updateCartItemQuantity: grpc.handleUnaryCall<_cart_UpdateCartItemQuantityRequest__Output, _cart_UpdateCartItemQuantityResponse>;
  
  viewCart: grpc.handleUnaryCall<_cart_ViewCartRequest__Output, _cart_CurrentCart>;
  
}

export interface CartServiceDefinition extends grpc.ServiceDefinition {
  addToCart: MethodDefinition<_cart_CartRequest, _cart_Product, _cart_CartRequest__Output, _cart_Product__Output>
  emptyCart: MethodDefinition<_cart_EmptyCartRequest, _cart_EmptyCartResponse, _cart_EmptyCartRequest__Output, _cart_EmptyCartResponse__Output>
  removeCartItem: MethodDefinition<_cart_RemoveCartItemRequest, _cart_RemoveCartItemResponse, _cart_RemoveCartItemRequest__Output, _cart_RemoveCartItemResponse__Output>
  updateCartItemQuantity: MethodDefinition<_cart_UpdateCartItemQuantityRequest, _cart_UpdateCartItemQuantityResponse, _cart_UpdateCartItemQuantityRequest__Output, _cart_UpdateCartItemQuantityResponse__Output>
  viewCart: MethodDefinition<_cart_ViewCartRequest, _cart_CurrentCart, _cart_ViewCartRequest__Output, _cart_CurrentCart__Output>
}
