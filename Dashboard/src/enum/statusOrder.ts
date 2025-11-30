export const OrderStatusEnum = {
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
} as const;

export type OrderStatusEnumType = keyof typeof OrderStatusEnum;

export const STATUS_LABELS: Record<string, string> = {
  [OrderStatusEnum.PROCESSING]: "Đang xử lý",
  [OrderStatusEnum.SHIPPED]: "Đã vận chuyển",
  [OrderStatusEnum.DELIVERED]: "Đã giao hàng",
  [OrderStatusEnum.CANCELLED]: "Đã huỷ",
};