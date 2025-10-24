export const AvailabilityEnum = {
  IN_STOCK: "IN_STOCK",
  LIMITED: "LIMITED",
  OUT_OF_STOCK: "OUT_OF_STOCK",
} as const;

export type AvailabilityEnumType = keyof typeof AvailabilityEnum;
