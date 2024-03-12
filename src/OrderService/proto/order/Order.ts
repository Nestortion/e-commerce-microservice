// Original file: order.proto

import type { PaymentOption as _order_PaymentOption, PaymentOption__Output as _order_PaymentOption__Output } from '../order/PaymentOption';

export interface Order {
  'customerID'?: (string);
  'customerName'?: (string);
  'email'?: (string);
  'phoneNumber'?: (number);
  'address'?: (string);
  'city'?: (string);
  'zipCode'?: (number);
  'totalPrice'?: (number);
  'paymentOption'?: (_order_PaymentOption);
}

export interface Order__Output {
  'customerID': (string);
  'customerName': (string);
  'email': (string);
  'phoneNumber': (number);
  'address': (string);
  'city': (string);
  'zipCode': (number);
  'totalPrice': (number);
  'paymentOption': (_order_PaymentOption__Output);
}
