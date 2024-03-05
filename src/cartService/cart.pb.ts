import { Product } from "cart";

//Service: CartService
export type addToCart = (params: CartRequest) => Promise<Product>;

export type viewCart = (params: ViewCartRequest) => Promise<CurrentCart>;

export interface CartRequest {
  productUUID: string;
  customerID: string;
}

export interface Product {
  productName: string;
  productPrice: number;
  productUUID: string;
  productDescription: string;
  productImage: string;
  productQuantity: number;
}

export interface CurrentCart {
  productsInCart?: Product[];
}

export interface ViewCartRequest {
  customerID: string;
}
