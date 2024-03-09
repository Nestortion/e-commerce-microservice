// Original file: inventory.proto

export const Status = {
  DEPLETED: 'DEPLETED',
  WARNING: 'WARNING',
  GOOD: 'GOOD',
} as const;

export type Status =
  | 'DEPLETED'
  | 1
  | 'WARNING'
  | 2
  | 'GOOD'
  | 3

export type Status__Output = typeof Status[keyof typeof Status]
