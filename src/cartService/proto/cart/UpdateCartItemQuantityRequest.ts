// Original file: cart.proto


export interface UpdateCartItemQuantityRequest {
  'customerID'?: (string);
  'productUUID'?: (string);
  'productQuantity'?: (number);
}

export interface UpdateCartItemQuantityRequest__Output {
  'customerID': (string);
  'productUUID': (string);
  'productQuantity': (number);
}
