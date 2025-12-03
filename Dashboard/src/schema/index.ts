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
  .array(
    z.instanceof(File, {
      message: "File không hợp lệ",
    })
  )
  .min(1, "Phải upload ít nhất 1 ảnh")
  .max(5, "Chỉ được upload tối đa 5 ảnh")
  .refine(
    (files) =>
      files.every((file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type)
      ),
    {
      message: "Ảnh phải là jpg, png hoặc webp",
    }
  );
