// Original file: cart.proto


export interface CartRequest {
  'productUUID'?: (string);
  'customerID'?: (string);
  'productQuantity'?: (number);
}

export interface CartRequest__Output {
  'productUUID': (string);
  'customerID': (string);
  'productQuantity': (number);
}
