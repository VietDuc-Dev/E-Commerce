import z from "zod";

export const pageSchema = z
  .string()
  .optional()
  .transform((val) => parseInt(val || "1"))
  .refine((n) => n > 0, "Page phải lớn hơn 0");

export const userIdSchema = z.string();
