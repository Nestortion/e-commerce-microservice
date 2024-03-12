// Original file: order.proto

import type { Order as _order_Order, Order__Output as _order_Order__Output } from '../order/Order';
import type { OrderItem as _order_OrderItem, OrderItem__Output as _order_OrderItem__Output } from '../order/OrderItem';

export interface CreateOrderRequest {
  'orderDetails'?: (_order_Order | null);
  'orderItems'?: (_order_OrderItem)[];
}

export interface CreateOrderRequest__Output {
  'orderDetails': (_order_Order__Output | null);
  'orderItems': (_order_OrderItem__Output)[];
}
