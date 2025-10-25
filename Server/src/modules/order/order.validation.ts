import { z } from "zod";

export const orderIdSchema = z.string();

const ProductImageSchema = z.object({
  url: z.string().url(),
});

const ProductSchema = z.object({
  id: z.string().uuid(),
  images: z.array(ProductImageSchema),
});

const OrderedItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().int().positive(),
});

export const placeNewOrderSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  city: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  addressDetail: z.string().min(1),
  phone: z
    .string()
    .min(9)
    .regex(/^(0|\+84)\d{9}$/, "Invalid Vietnamese phone number format."),
  orderedItems: z
    .array(OrderedItemSchema)
    .min(1, "At least one ordered item is required"),
});

export type PlaceNewOrderDto = z.infer<typeof placeNewOrderSchema>;
