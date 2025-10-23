import { email, z } from "zod";

const nameSchema = z
  .string({ message: "Username is required" })
  .min(3, "Username must be at least 3 characters long")
  .max(50, "Username must be less than 50 characters");

export const emailSchema = z
  .string({ message: "Email is required" })
  .trim()
  .email("Invalid email address")
  .min(1)
  .max(255);

export const passwordSchema = z
  .string({ message: "Password is required" })
  .trim()
  .min(6, "Password must be at least 6 characters long");

const fileSchema = z
  .object({
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
  })
  .optional();

// --------------- REGISTER ---------------
export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterDto = z.infer<typeof registerSchema>;

// --------------- LOGIN ---------------
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginDto = z.infer<typeof loginSchema>;

// --------------- CHANGE PASSWORD ---------------
export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((val) => val.password === val.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

// --------------- UPDATE PASSWORD ---------------
export const updatePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((val) => val.newPassword === val.confirmNewPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

// --------------- UPDATE PASSWORD ---------------
export const updateProfile = z.object({
  name: nameSchema,
  email: emailSchema,
  avatar: fileSchema,
});
