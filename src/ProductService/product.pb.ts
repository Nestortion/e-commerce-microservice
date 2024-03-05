import { ProductData } from "product";

import { ProductData } from "product";

//Service: ProductService
export type addProduct = (params: ProductRequest) => Promise<ProductResponse>;

export type viewProducts = (
  params: ViewProductsRequest
) => Promise<ProductList>;

export type viewProductsById = (params: ProductUUID) => Promise<ProductList>;
export type viewProductById = (params: ProductUUID) => Promise<ProductList>;

export interface ViewProductByIdResponse {
  product: ProductData;
  stocksLeft: number;
  stocksStatus: string;
}

export interface ProductData {
  productName: string;
  productDescription: string;
  productPrice: number;
  productUUID: string;
  productImage: string;
}

export interface ProductRequest {
  productName: string;
  productDescription: string;
  productPrice: number;
}

export interface ViewProductsRequest {
  pageNum: number;
}

export interface ProductResponse {
  productId: number;
  product: ProductData;
  productUUID: string;
}

export interface ProductList {
  productList?: ProductData[];
}

export interface ProductUUID {
  productUUID?: string[];
}

export interface Empty {}
