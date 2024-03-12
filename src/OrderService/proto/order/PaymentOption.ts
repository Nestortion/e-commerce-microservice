// Original file: order.proto

export const PaymentOption = {
  CARD: 'CARD',
  PAYPAY: 'PAYPAY',
  GCASH: 'GCASH',
} as const;

export type PaymentOption =
  | 'CARD'
  | 1
  | 'PAYPAY'
  | 2
  | 'GCASH'
  | 3

export type PaymentOption__Output = typeof PaymentOption[keyof typeof PaymentOption]
