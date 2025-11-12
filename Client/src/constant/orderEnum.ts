import { OrderStatusEnum } from ".";

export const STATUS_LABELS_FILTER: Record<string, string> = {
  All: "Tất cả",
  [OrderStatusEnum.PROCESSING]: "Đang xử lý",
  [OrderStatusEnum.SHIPPED]: "Đã vận chuyển",
  [OrderStatusEnum.DELIVERED]: "Đã giao hàng",
  [OrderStatusEnum.CANCELLED]: "Đã huỷ",
};

export const STATUS_LABELS: Record<string, string> = {
  [OrderStatusEnum.PROCESSING]: "Đang xử lý",
  [OrderStatusEnum.SHIPPED]: "Đã vận chuyển",
  [OrderStatusEnum.DELIVERED]: "Đã giao hàng",
  [OrderStatusEnum.CANCELLED]: "Đã huỷ",
};

export const STATUS_COLORS: Record<string, string> = {
  [OrderStatusEnum.PROCESSING]: "bg-yellow-100 text-yellow-800",
  [OrderStatusEnum.SHIPPED]: "bg-blue-100 text-blue-800",
  [OrderStatusEnum.DELIVERED]: "bg-green-100 text-green-800",
  [OrderStatusEnum.CANCELLED]: "bg-red-100 text-red-800",
};
