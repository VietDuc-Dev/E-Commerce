import z, { string } from "zod";
import { AvailabilityEnum } from "../../common/enums/product.enum";

export const pageSchema = z.number().optional();
export const productIdSchema = z.string();

const nameSchema = z
  .string({ message: "Tên sản phẩm là bắt buộc" })
  .min(3, "Tên sản phẩm phải có ít nhất 3 ký tự")
  .max(100, "Tên sản phẩm không vượt quá 100 ký tự");

const descriptionSchema = z
  .string({ message: "Mô tả sản phẩm là bắt buộc" })
  .min(10, "Mô tả sản phẩm quá ngắn")
  .max(1000, "Mô tả sản phẩm không vượt quá 1000 ký tự");

const priceSchema = z
  .string({ message: "Giá sản phẩm là bắt buộc" })
  .min(1, "Giá sản phẩm là bắt buộc")
  .transform((val) => Number(val))
  .refine((val) => val > 0, "Giá sản phẩm phải lớn hơn 0");

const categorySchema = z
  .string({ message: "Danh mục sản phẩm là bắt buộc" })
  .min(2, "Danh mục phải có ít nhất 2 ký tự");

const stockSchema = z
  .string({ message: "Số lượng tồn kho là bắt buộc" })
  .transform((val) => Number(val))
  .refine((val) => val > 0, "Số lượng phải lớn hơn 0");

// Schema cho một ảnh
const singleFileSchema = z.object({
  tempFilePath: z.string(),
  mimetype: z
    .string()
    .refine(
      (type) => ["image/jpeg", "image/png", "image/webp"].includes(type),
      "Chỉ chấp nhận file ảnh (.jpg, .png, .webp)"
    ),
  size: z
    .number()
    .max(5 * 1024 * 1024, "Kích thước file không được vượt quá 5MB"),
  name: z.string().optional(),
  data: z.any().optional(),
});

const filesSchema = z
  .array(singleFileSchema)
  .nonempty({ message: "Phải có ít nhất 1 ảnh sản phẩm" });

export const fetchAllProductsSchema = z.object({
  availability: z.enum(Object.values(AvailabilityEnum)).optional(),
  price: z.string().optional(),
  category: z.string().optional(),
  ratings: z
    .string()
    .transform((val) => Number(val))
    .optional(),
  search: z.string().optional(),
  page: z
    .string()
    .default("1")
    .transform((val) => Number(val)),
});

export const postProductReviewSchema = z.object({
  rating: z.number({ message: "Vui lòng thêm xếp hạng" }),
  comment: z.string({ message: "vui lòng thêm nhận xét" }).min(1),
});

export const userPromptSchema = z.string().min(1, '"Phải có ít nhất 1 ký tự"');

// --------------- CREATE PRODUCT ---------------
export const createProductSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  price: priceSchema,
  category: categorySchema,
  stock: stockSchema,
  images: filesSchema,
});

export type CreateProductDto = z.infer<typeof createProductSchema>;

// --------------- UPDATE PRODUCT ---------------
export const updateProductSchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  price: priceSchema,
  category: categorySchema,
  stock: stockSchema,
});

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
