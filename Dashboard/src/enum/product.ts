export const AvailabilityEnum = {
  IN_STOCK: "Còn sản phẩm",
  LIMITED: "Số lượng có hạn",
  OUT_OF_STOCK: "Bán hết",
} as const;

export type AvailabilityType = keyof typeof AvailabilityEnum;
