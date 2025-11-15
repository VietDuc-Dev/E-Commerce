export const AuthModeEnum = {
  signin: "signin",
  signup: "signup",
  forgot: "forgot",
  reset: "reset",
} as const;

export const OrderStatusEnum = {
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export const PaymentStatusEnum = {
  PAID: "Paid",
  PENDING: "Pending",
  FAILED: "Failed",
} as const;

export const AvailabilityEnum = {
  IN_STOCK: "IN_STOCK",
  LIMITED: "LIMITED",
  OUT_OF_STOCK: "OUT_OF_STOCK",
} as const;

export type OrderStatusEnumType = keyof typeof OrderStatusEnum;
export type PaymentStatusEnumType = keyof typeof PaymentStatusEnum;
export type AuthModeEnumType = keyof typeof AuthModeEnum;
export type AvailabilityType = keyof typeof AvailabilityEnum;
