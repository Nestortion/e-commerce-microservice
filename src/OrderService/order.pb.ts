import { Order } from "order";
import { OrderDetails } from "order";

import { Order } from "order";
import { OrderDetails } from "order";

//Service: OrderService
type createOrder = (params: OrderRequest) => Promise<OrderResponse>;

export interface Order {
  orderId: number;
  customerUUID: string;
  orderUUID: string;
}

export interface OrderDetails {
  orderUUID?: string;
  productUUID: string;
  productPrice: number;
  productQuantity: number;
}

export interface OrderRequest {
  customerUUID: string;
  orderDetails: OrderDetails;
}

export interface OrderResponse {
  order: Order;
  orderDetails: OrderDetails;
}
