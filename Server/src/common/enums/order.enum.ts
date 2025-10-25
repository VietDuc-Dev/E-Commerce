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

export type OrderStatusEnumType = keyof typeof OrderStatusEnum;
export type PaymentStatusEnumType = keyof typeof PaymentStatusEnum;
