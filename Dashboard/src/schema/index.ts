import { z } from "zod";

export const fileSchema = z
  .instanceof(File)
  .optional()
  .refine(
    (file) =>
      !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Chỉ chấp nhận file ảnh (.jpg, .png, .webp)"
  )
  .refine((file) => !file || file.size <= 5 * 1024 * 1024, "File quá lớn");

export const imagesSchema = z
  .array(fileSchema)
  .nonempty("Hãy chọn ít nhất 1 ảnh");
