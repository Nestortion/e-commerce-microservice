// Original file: product.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ProductList as _product_ProductList, ProductList__Output as _product_ProductList__Output } from '../product/ProductList';
import type { ProductRequest as _product_ProductRequest, ProductRequest__Output as _product_ProductRequest__Output } from '../product/ProductRequest';
import type { ProductResponse as _product_ProductResponse, ProductResponse__Output as _product_ProductResponse__Output } from '../product/ProductResponse';
import type { ViewProductByIdRequest as _product_ViewProductByIdRequest, ViewProductByIdRequest__Output as _product_ViewProductByIdRequest__Output } from '../product/ViewProductByIdRequest';
import type { ViewProductByIdResponse as _product_ViewProductByIdResponse, ViewProductByIdResponse__Output as _product_ViewProductByIdResponse__Output } from '../product/ViewProductByIdResponse';
import type { ViewProductsByIdRequest as _product_ViewProductsByIdRequest, ViewProductsByIdRequest__Output as _product_ViewProductsByIdRequest__Output } from '../product/ViewProductsByIdRequest';
import type { ViewProductsRequest as _product_ViewProductsRequest, ViewProductsRequest__Output as _product_ViewProductsRequest__Output } from '../product/ViewProductsRequest';

export interface ProductServiceClient extends grpc.Client {
  addProduct(argument: _product_ProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  addProduct(argument: _product_ProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  addProduct(argument: _product_ProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  addProduct(argument: _product_ProductRequest, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  addProduct(argument: _product_ProductRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  addProduct(argument: _product_ProductRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  addProduct(argument: _product_ProductRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  addProduct(argument: _product_ProductRequest, callback: grpc.requestCallback<_product_ProductResponse__Output>): grpc.ClientUnaryCall;
  
  viewProductById(argument: _product_ViewProductByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  viewProductById(argument: _product_ViewProductByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  viewProductById(argument: _product_ViewProductByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  viewProductById(argument: _product_ViewProductByIdRequest, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  viewProductById(argument: _product_ViewProductByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  viewProductById(argument: _product_ViewProductByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  viewProductById(argument: _product_ViewProductByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  viewProductById(argument: _product_ViewProductByIdRequest, callback: grpc.requestCallback<_product_ViewProductByIdResponse__Output>): grpc.ClientUnaryCall;
  
  viewProducts(argument: _product_ViewProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProducts(argument: _product_ViewProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProducts(argument: _product_ViewProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProducts(argument: _product_ViewProductsRequest, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProducts(argument: _product_ViewProductsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProducts(argument: _product_ViewProductsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProducts(argument: _product_ViewProductsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProducts(argument: _product_ViewProductsRequest, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  
  viewProductsById(argument: _product_ViewProductsByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProductsById(argument: _product_ViewProductsByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProductsById(argument: _product_ViewProductsByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProductsById(argument: _product_ViewProductsByIdRequest, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProductsById(argument: _product_ViewProductsByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProductsById(argument: _product_ViewProductsByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProductsById(argument: _product_ViewProductsByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  viewProductsById(argument: _product_ViewProductsByIdRequest, callback: grpc.requestCallback<_product_ProductList__Output>): grpc.ClientUnaryCall;
  
}

export interface ProductServiceHandlers extends grpc.UntypedServiceImplementation {
  addProduct: grpc.handleUnaryCall<_product_ProductRequest__Output, _product_ProductResponse>;
  
  viewProductById: grpc.handleUnaryCall<_product_ViewProductByIdRequest__Output, _product_ViewProductByIdResponse>;
  
  viewProducts: grpc.handleUnaryCall<_product_ViewProductsRequest__Output, _product_ProductList>;
  
  viewProductsById: grpc.handleUnaryCall<_product_ViewProductsByIdRequest__Output, _product_ProductList>;
  
}

export interface ProductServiceDefinition extends grpc.ServiceDefinition {
  addProduct: MethodDefinition<_product_ProductRequest, _product_ProductResponse, _product_ProductRequest__Output, _product_ProductResponse__Output>
  viewProductById: MethodDefinition<_product_ViewProductByIdRequest, _product_ViewProductByIdResponse, _product_ViewProductByIdRequest__Output, _product_ViewProductByIdResponse__Output>
  viewProducts: MethodDefinition<_product_ViewProductsRequest, _product_ProductList, _product_ViewProductsRequest__Output, _product_ProductList__Output>
  viewProductsById: MethodDefinition<_product_ViewProductsByIdRequest, _product_ProductList, _product_ViewProductsByIdRequest__Output, _product_ProductList__Output>
}
