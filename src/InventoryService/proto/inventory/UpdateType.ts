// Original file: inventory.proto

export const UpdateType = {
  DECREASE: 'DECREASE',
  INCREASE: 'INCREASE',
} as const;

export type UpdateType =
  | 'DECREASE'
  | 1
  | 'INCREASE'
  | 2

export type UpdateType__Output = typeof UpdateType[keyof typeof UpdateType]
